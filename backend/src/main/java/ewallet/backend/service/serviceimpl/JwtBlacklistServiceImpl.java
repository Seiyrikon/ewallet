package ewallet.backend.service.serviceimpl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ewallet.backend.config.TokenBlacklist;
import ewallet.backend.service.JwtBlacklistService;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class JwtBlacklistServiceImpl implements JwtBlacklistService
{

    @Autowired
    private TokenBlacklist tokenBlacklist;

    Map<String, Object> response = new HashMap<String, Object>();

    @Override
    public ResponseEntity<Map<String, Object>> logout(HttpServletRequest request) 
    {
        // Get the JWT token from the request header or wherever it's stored
        String token = extractTokenFromRequest(request);

        // Invalidate the token
        tokenBlacklist.invalidateToken(token);

        // Optionally, perform additional logout actions if needed
        response.put("message", "Logged out successfully");
        return ResponseEntity.ok(response);
    }

    @Override
    public String extractTokenFromRequest(HttpServletRequest request) 
    {
        // Get the Authorization header
        String authorizationHeader = request.getHeader("Authorization");

        // Check if the Authorization header exists and starts with "Bearer "
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            // Extract the token after "Bearer "
            return authorizationHeader.substring(7); // 7 is the length of "Bearer "
        }

        return null; // Return null if token is not found or improperly formatted
    }
    
}
