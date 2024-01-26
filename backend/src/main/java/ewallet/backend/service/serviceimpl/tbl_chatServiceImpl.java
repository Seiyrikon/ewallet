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
import ewallet.backend.dao.tbl_chat_historyDao;
import ewallet.backend.dto.ChatSessionDto;
import ewallet.backend.dto.tbl_confirm_request_mstDto;
import ewallet.backend.dto.mapper.ChatSessionDtoMapper;
import ewallet.backend.model.ChatInfoModel;
import ewallet.backend.model.tbl_chat_history;
import ewallet.backend.service.tbl_chatService;

@Service
public class tbl_chatServiceImpl implements tbl_chatService
{
    @Autowired
    private tbl_chatDao tblChatDao;

    @Autowired
    private ChatSessionDtoMapper chatSessionDtoMapper;

    @Autowired
    private tbl_chat_historyDao tbl_chat_historyDao;

    Map<String, Object> response = new HashMap<String, Object>();
    List<ChatSessionDto> messages = new ArrayList<ChatSessionDto>();

    @Override
    public ResponseEntity<Map<String, Object>> getAllChatOfUserWithUser(Long receiver_id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllChatOfUserWithUser'");
    }

    @Override
    public ResponseEntity<Map<String, Object>> inserChat(ChatInfoModel body, Long receiver_id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the username of the logged in user
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());
                
                if(body != null)
                {
                    ChatInfoModel message = new ChatInfoModel();

                    message.setSender_id(userId);
                    message.setReceiver_id(receiver_id);
                    message.setMessage(body.getMessage());
                    tblChatDao.inserChat(message);

                    tbl_chat_history history = tbl_chat_historyDao.getChatHistoryOfUserWithRecipient(userId, receiver_id);
                    if(history == null)
                    {
                        if(userId != receiver_id)
                        {
                            tbl_chat_historyDao.insertChatHistory(userId, receiver_id);
                            tbl_chat_historyDao.insertChatHistory(receiver_id, userId);
                            tbl_chat_historyDao.updateChatHistory(userId, receiver_id);
                            tbl_chat_historyDao.updateChatHistory(receiver_id, userId);
                        }
                        else 
                        {
                            tbl_chat_historyDao.insertChatHistory(userId, receiver_id);
                            tbl_chat_historyDao.updateChatHistory(userId, receiver_id);
                        }
                    }
                    else 
                    {
                        tbl_chat_historyDao.updateChatHistory(userId, receiver_id);
                        tbl_chat_historyDao.updateChatHistory(receiver_id, userId);
                    }

                    response.put("message", "Message sent");
                }
                else
                {
                    response.put("message", "Something went wrong");
                    return ResponseEntity.status(401).body(response);
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

    @Override
    public ResponseEntity<Map<String, Object>> getAllSentMessageOfUserToUser(Long receiver_id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());

                messages = tblChatDao.getAllSentMessageOfUserToUser(userId, receiver_id)
                .stream()
                .map(chatSessionDtoMapper).collect(Collectors.toList());
    
                if(messages.size() != 0)

                {
                    response.put("message", messages);
                }
                else
                {
                    response.put("message", "No message yet");
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

    @Override
    public ResponseEntity<Map<String, Object>> getAllReceivedMessageOfUserFromUser(Long sender_id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());

                messages = tblChatDao.getAllReceivedMessageOfUserFromUser(userId, sender_id)
                .stream()
                .map(chatSessionDtoMapper).collect(Collectors.toList());
    
                if(messages.size() != 0)

                {
                    response.put("message", messages);
                }
                else
                {
                    response.put("message", "No message yet");
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
