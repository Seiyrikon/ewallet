package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import ewallet.backend.model.LoginModel;

public interface LoginService 
{
    public ResponseEntity<Map<String, Object>> login(LoginModel body);
    public ResponseEntity<Map<String, Object>> authenticate(LoginModel body);
}
