package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface FriendFeatureService 
{
    public ResponseEntity<Map<String, Object>> insertFriendRequest(Long requesteeId);
    public ResponseEntity<Map<String, Object>> acceptFriendButton(Long friendId);
    public ResponseEntity<Map<String, Object>> declineFriendRequest(Long friendId);
}
