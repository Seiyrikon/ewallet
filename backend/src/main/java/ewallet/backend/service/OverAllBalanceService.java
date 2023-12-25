package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface OverAllBalanceService 
{
    public ResponseEntity<Map<String, Object>> getOverAllBalancePerUser();   
}
