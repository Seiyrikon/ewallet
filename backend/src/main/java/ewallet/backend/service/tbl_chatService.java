package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import ewallet.backend.model.ChatInfoModel;

public interface tbl_chatService 
{
    public ResponseEntity<Map<String, Object>> getAllChatOfUserWithUser(Long receiver_id);
    public ResponseEntity<Map<String, Object>> getAllSentMessageOfUserToUser(Long receiver_id);
    public ResponseEntity<Map<String, Object>> getAllReceivedMessageOfUserFromUser(Long sender_id);
    public ResponseEntity<Map<String, Object>> inserChat(ChatInfoModel body, Long receiver_id);
}
