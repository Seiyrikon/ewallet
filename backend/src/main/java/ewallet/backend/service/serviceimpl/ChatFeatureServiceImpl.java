package ewallet.backend.service.serviceimpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_chatDao;
import ewallet.backend.dao.tbl_user_mstDao;
import ewallet.backend.dto.ChatSessionDto;
import ewallet.backend.dto.mapper.ChatSessionDtoMapper;
import ewallet.backend.model.tbl_user_mst;
import ewallet.backend.service.ChatFeatureService;

@Service
public class ChatFeatureServiceImpl implements ChatFeatureService
{
    @Autowired
    private tbl_chatDao tbl_chatDao;

    @Autowired
    private tbl_user_mstDao tbl_user_mstDao;

    @Autowired
    private ChatSessionDtoMapper chatSessionDtoMapper;

    Map<String, Object> response = new HashMap<String, Object>();
    List<ChatSessionDto> senderMessages = new ArrayList<ChatSessionDto>();
    List<ChatSessionDto> receiverMessages = new ArrayList<ChatSessionDto>();

    @Override
    public ResponseEntity<Map<String, Object>> chats(Long user_id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());

                senderMessages = tbl_chatDao.getAllSentMessageOfUserToUser(userId, user_id)
                .stream()
                .map(chatSessionDtoMapper).collect(Collectors.toList());

                receiverMessages = tbl_chatDao.getAllReceivedMessageOfUserFromUser(userId, user_id)
                .stream()
                .map(chatSessionDtoMapper).collect(Collectors.toList());

                List<ChatSessionDto> chats = new ArrayList<ChatSessionDto>(senderMessages.size() + receiverMessages.size());

                // Get the maximum size of senderMessages and receiverMessages
                int maxSize = Math.max(senderMessages.size(), receiverMessages.size());

                for (int i = 0; i < maxSize; i++) {
                    // Add sender message if available
                    if (i < senderMessages.size()) {
                        chats.add(senderMessages.get(i));
                    }

                    // Add receiver message if available
                    if (i < receiverMessages.size()) {
                        chats.add(receiverMessages.get(i));
                    }
                }
    
                if(chats.size() != 0)
                {
                    response.put("message", chats);
                }
                else
                {
                    tbl_user_mst user = tbl_user_mstDao.getUserById(user_id);

                    if(user == null)
                    {
                        response.put("message", "User not found");
                        return ResponseEntity.status(404).body(response);
                    }
                    response.put("message", "Chat with " + user.getUsername());
                    return ResponseEntity.status(404).body(response);
                }
            }
            else 
            {
                response.put("message", "You must login first");
                return ResponseEntity.status(403).body(response);
            }
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
            response.put("message", "Internal Server Error");
            return ResponseEntity.status(500).body(response);
        }
        return ResponseEntity.ok(response);
    }
    
}
