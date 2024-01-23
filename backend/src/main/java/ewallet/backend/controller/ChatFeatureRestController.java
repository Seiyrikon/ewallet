package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.service.ChatFeatureService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class ChatFeatureRestController 
{
    @Autowired
    private ChatFeatureService chatFeatureService;

    @GetMapping("chats/{user_id}")
    public ResponseEntity<Map<String, Object>> chats(@PathVariable Long user_id)
    {
        return chatFeatureService.chats(user_id);
    }
}
