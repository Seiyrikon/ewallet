package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.model.LoginModel;
import ewallet.backend.service.LoginService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class LoginRestController 
{
    @Autowired
    private LoginService loginService;

    @PostMapping("login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginModel body)
    {
        return loginService.login(body);
    }

    @PostMapping("authenticate")
    public ResponseEntity<Map<String, Object>> authenticate(@RequestBody LoginModel body)
    {
        return loginService.authenticate(body);
    }
}
