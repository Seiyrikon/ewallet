package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import ewallet.backend.model.RegisterModel;

public interface ResgisterService 
{
    public ResponseEntity<Map<String, Object>> register(RegisterModel body);
}
