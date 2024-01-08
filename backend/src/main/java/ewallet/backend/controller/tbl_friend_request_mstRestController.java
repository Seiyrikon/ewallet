package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.service.tbl_friend_request_mstService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class tbl_friend_request_mstRestController 
{
    
    @Autowired
    private tbl_friend_request_mstService tbl_friend_request_mstService;

    @GetMapping("user/pending-request/all")
    public ResponseEntity<Map<String, Object>> getAllFriendsOfUser()
    {
        return tbl_friend_request_mstService.getAllFriendRequestofUser();
    }

    //for add friend button
    @PostMapping("user/friend-request/insert/{requesteeId}")
    public ResponseEntity<Map<String, Object>> insertFriendRequest(@PathVariable Long requesteeId) 
    {
        return tbl_friend_request_mstService.insertFriendRequest(requesteeId);
    }
    
}
