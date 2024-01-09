package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.service.FriendFeatureService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class FriendFeatureRestController 
{
    
    @Autowired
    private FriendFeatureService friendFeatureService;

    @PostMapping("friend/add-friend/{friendId}")
    private ResponseEntity<Map<String, Object>> inserFriendRequest(@PathVariable Long friendId)
    {
        return friendFeatureService.insertFriendRequest(friendId);
    }

    @PostMapping("friend/accept-friend/{friendId}")
    private ResponseEntity<Map<String, Object>> acceptFriendButton(@PathVariable Long friendId) 
    {
        return friendFeatureService.acceptFriendButton(friendId);
    }

    @DeleteMapping("friend/decline-friend/{friendId}")
    private ResponseEntity<Map<String, Object>> declineFriendRequest(@PathVariable Long friendId) 
    {
        return friendFeatureService.declineFriendRequest(friendId);
    }
}
