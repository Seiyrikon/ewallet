package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface tbl_transactionService 
{
    public ResponseEntity<Map<String, Object>> getAllTransactionPerWallet(Long walletId);    
    public ResponseEntity<Map<String, Object>> getAllTransactionPerUser();    
}
