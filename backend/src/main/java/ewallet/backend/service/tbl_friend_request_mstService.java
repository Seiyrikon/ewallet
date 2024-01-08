package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface tbl_friend_request_mstService 
{
    public ResponseEntity<Map<String, Object>> getAllFriendRequestofUser();
    public ResponseEntity<Map<String, Object>> insertFriendRequest(Long requesteeId);
}
