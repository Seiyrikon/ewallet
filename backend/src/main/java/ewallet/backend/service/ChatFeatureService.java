package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface ChatFeatureService 
{
    public ResponseEntity<Map<String, Object>> chats(Long user_id);
}
