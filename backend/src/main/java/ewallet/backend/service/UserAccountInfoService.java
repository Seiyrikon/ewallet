package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface UserAccountInfoService 
{
    public ResponseEntity<Map<String, Object>> getUserAccountInfo(Long userId);
}
