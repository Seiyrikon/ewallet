package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.service.tbl_user_friend_mstService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class tbl_user_friend_mstRestController 
{
    @Autowired
    private tbl_user_friend_mstService tbl_user_friend_mstService;

    @GetMapping("user/friend/all")
    public ResponseEntity<Map<String, Object>> getAllFriendsOfUser()
    {
        return tbl_user_friend_mstService.getAllFriendsOfUser();
    }

    //for confirm friend button
    @PostMapping("user/friend/insert/{friendId}")
    public ResponseEntity<Map<String, Object>> insertFriend(@PathVariable Long friendId)
    {
        return tbl_user_friend_mstService.insertFriend(friendId);
    }
}
