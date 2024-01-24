package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.service.tbl_chat_historyService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class tbl_chat_historyRestController 
{
    @Autowired
    private tbl_chat_historyService tbl_chat_historyService;

    @GetMapping("chat-history")
    public ResponseEntity<Map<String, Object>> getAllChatHistoryInfoOfUser()
    {
        return tbl_chat_historyService.getAllChatHistoryInfoOfUser();
    }

}
