package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface tbl_confirm_request_mstService 
{
    public ResponseEntity<Map<String, Object>> cofirmRequest(Long requestedId);
}
