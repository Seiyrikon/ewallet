package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface tbl_user_friend_mstService 
{
    public ResponseEntity<Map<String, Object>> getAllFriendsOfUser();
    public ResponseEntity<Map<String, Object>> insertFriend(Long friendId);
}
