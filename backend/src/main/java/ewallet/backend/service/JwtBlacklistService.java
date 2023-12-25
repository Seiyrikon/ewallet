package ewallet.backend.service;

import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletRequest;

public interface JwtBlacklistService 
{
    public ResponseEntity<?> logout(HttpServletRequest request);
    public String extractTokenFromRequest(HttpServletRequest request);
}
