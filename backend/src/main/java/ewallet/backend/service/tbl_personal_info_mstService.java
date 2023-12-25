package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import ewallet.backend.model.tbl_personal_info_mst;

public interface tbl_personal_info_mstService 
{
    
    public ResponseEntity<Map<String, Object>> getUserPersonalInfo(Long USER_ID);
    public ResponseEntity<Map<String, Object>> insertPersonalInfo(tbl_personal_info_mst body, Long userId);

}
