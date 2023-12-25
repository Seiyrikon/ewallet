package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface PrincipalService 
{
    public ResponseEntity<Map<String, Object>> getPrincipalInfo();
}
