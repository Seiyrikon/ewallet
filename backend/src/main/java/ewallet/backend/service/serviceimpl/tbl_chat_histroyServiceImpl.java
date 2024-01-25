package ewallet.backend.service.serviceimpl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_chat_historyDao;
import ewallet.backend.dto.ChatHistoryDto;
import ewallet.backend.dto.ChatSessionDto;
import ewallet.backend.dto.mapper.ChatHistoryDtoMapper;
import ewallet.backend.model.tbl_chat_history;
import ewallet.backend.service.tbl_chat_historyService;

@Service
public class tbl_chat_histroyServiceImpl implements tbl_chat_historyService
{
    @Autowired
    private tbl_chat_historyDao tbl_chat_historyDao;

    @Autowired
    private ChatHistoryDtoMapper chatHistoryDtoMapper;

    Map<String, Object> response = new HashMap<String, Object>();
    List<tbl_chat_history> histories = new ArrayList<tbl_chat_history>();
    List<ChatHistoryDto> historyInfo = new ArrayList<ChatHistoryDto>();

    @Override
    public ResponseEntity<Map<String, Object>> getAllChatHistoryOfUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());

                histories = tbl_chat_historyDao.getAllChatHistoryOfUser(userId);
    
                if(histories.size() != 0)

                {
                    response.put("message", histories);
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
    public ResponseEntity<Map<String, Object>> getAllChatHistoryInfoOfUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());

                historyInfo = tbl_chat_historyDao.getAllChatHistoryInfoOfUser(userId)
                .stream()
                .map(chatHistoryDtoMapper).collect(Collectors.toList());
    
                if(historyInfo.size() != 0)
                {
                    response.put("message", historyInfo);
                }
                else
                {
                    response.put("message", "Chat with someone");
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
