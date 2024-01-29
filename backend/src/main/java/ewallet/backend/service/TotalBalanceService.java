package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface TotalBalanceService 
{
    public ResponseEntity<Map<String, Object>> getTotalBalancePerWallet(Long user_id, Long walletId);   
    public ResponseEntity<Map<String, Object>> getOverAllBalancePerUser();   
}
