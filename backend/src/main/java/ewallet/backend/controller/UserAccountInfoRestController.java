package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.model.UserAccountInfoModel;
import ewallet.backend.service.UserAccountInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class UserAccountInfoRestController 
{    
    @Autowired
    private UserAccountInfoService userAccountInfoService;

    @GetMapping("user-account-info/{userId}")
    public ResponseEntity<Map<String, Object>> getUserAccountInfo(@PathVariable Long userId)
    {
        return userAccountInfoService.getUserAccountInfo(userId);
    }

    @PutMapping("user/update")
    public ResponseEntity<Map<String, Object>> updateUserAccount(@RequestBody UserAccountInfoModel body) {
        return userAccountInfoService.updateUserAccount(body);
    }
    
}
