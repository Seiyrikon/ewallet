package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.model.ChatInfoModel;
import ewallet.backend.service.tbl_chatService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class tbl_chatRestController 
{
    @Autowired
    private tbl_chatService tbl_chatService;

    @GetMapping("chat/sent/{receiver_id}")
    public ResponseEntity<Map<String, Object>> getAllSentMessageOfUserToUser(@PathVariable Long receiver_id)
    {
        return tbl_chatService.getAllSentMessageOfUserToUser(receiver_id);
    }

    @GetMapping("chat/received/{sender_id}")
    public ResponseEntity<Map<String, Object>> getAllReceivedMessageOfUserFromUser(@PathVariable Long sender_id)
    {
        return tbl_chatService.getAllReceivedMessageOfUserFromUser(sender_id);
    }

    @PostMapping("chat/send/{receiver_id}")
    public ResponseEntity<Map<String, Object>> insertChat(@RequestBody ChatInfoModel body, @PathVariable Long receiver_id)
    {
        return tbl_chatService.inserChat(body, receiver_id);
    }
}
