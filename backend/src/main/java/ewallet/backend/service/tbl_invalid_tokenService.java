package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletRequest;

public interface tbl_invalid_tokenService {
    public ResponseEntity<Map<String, Object>> getInvalidToken(HttpServletRequest request);
}
