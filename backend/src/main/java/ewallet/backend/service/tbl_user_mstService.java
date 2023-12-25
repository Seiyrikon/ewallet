package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import ewallet.backend.model.tbl_user_mst;

public interface tbl_user_mstService 
{
    public ResponseEntity<Map<String, Object>> getUserAccount(Long USER_ID);
    public ResponseEntity<Map<String, Object>> insertUser(tbl_user_mst body);
    public ResponseEntity<Map<String, Object>> findByUsername(String username);
    public tbl_user_mst loadByUsername(String username);
}
