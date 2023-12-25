package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import ewallet.backend.model.tbl_deposit;

public interface tbl_depositService 
{
    public ResponseEntity<Map<String, Object>> getAllDepositPerWallet(Long walletId);
    public ResponseEntity<Map<String, Object>> insertDeposit(tbl_deposit body, Long walletId);
    public ResponseEntity<Map<String, Object>> getTotalDepositPerWallet(Long walletId);
}
