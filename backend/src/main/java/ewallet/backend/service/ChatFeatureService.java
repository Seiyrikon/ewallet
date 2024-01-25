package ewallet.backend.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import ewallet.backend.dto.ChatSessionDto;

public interface ChatFeatureService 
{
    public ResponseEntity<Map<String, Object>> chats(Long user_id);
    public ResponseEntity<Map<String, Object>> getChatSession(Long user_id);
}
