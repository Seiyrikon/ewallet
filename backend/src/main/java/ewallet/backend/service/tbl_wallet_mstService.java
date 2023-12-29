package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import ewallet.backend.model.tbl_wallet_mst;

public interface tbl_wallet_mstService 
{
    public ResponseEntity<Map<String, Object>> getAllWallet();
    public ResponseEntity<Map<String, Object>> getAllUserWallet();
    public ResponseEntity<Map<String, Object>> getWalletById(Long walletId);
    public ResponseEntity<Map<String, Object>> insertWallet(tbl_wallet_mst body);
    public ResponseEntity<Map<String, Object>> logicalDeleteWalletById(Long walletId);
}
