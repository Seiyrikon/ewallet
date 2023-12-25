package ewallet.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.config.TokenBlacklist;
import ewallet.backend.service.JwtBlacklistService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class LogoutRestController 
{
    @Autowired
    private TokenBlacklist tokenBlacklist;

    @Autowired
    private JwtBlacklistService jwtBlacklistService;

    Map<String, Object> response = new HashMap<String, Object>();

    @PostMapping("logout")
    public ResponseEntity<Map<String, Object>> logout(HttpServletRequest request) 
    {
        // Get the JWT token from the request header
        String token = jwtBlacklistService.extractTokenFromRequest(request);

        // Check if the token is invalidated
        if (token != null && tokenBlacklist.isTokenInvalidated(token)) 
        {
            // Token is already invalidated, handle accordingly
            response.put("message", "Token is already invalidated");
            return ResponseEntity.status(403).body(response);
        }

        // Invalidate the token
        if (token != null && !token.isEmpty()) 
        {
            tokenBlacklist.invalidateToken(token);
            response.put("message", "Logged out successfully");
        } 
        else 
        {
            // Handle case when token is missing or empty
            response.put("message", "Token not provided");
            return ResponseEntity.status(401).body(response);
        }

        // Optionally, perform additional logout actions if needed

        return ResponseEntity.ok(response);
    }
}
