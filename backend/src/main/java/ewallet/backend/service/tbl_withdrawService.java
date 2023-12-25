package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import ewallet.backend.model.tbl_withdraw;

public interface tbl_withdrawService 
{
    public ResponseEntity<Map<String, Object>> getAllWithdrawPerWallet(Long walletId);
    public ResponseEntity<Map<String, Object>> insertWithdraw(tbl_withdraw body, Long walletId);
    public ResponseEntity<Map<String, Object>> getTotalWithdrawPerWallet(Long walletId);
}
