package ewallet.backend.service;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import io.jsonwebtoken.Claims;

public interface JwtService 
{
    public String extractUserId(String jwt);
    public <T> T extractClaim(String jwt, Function<Claims, T> claimsResolver);
    public Claims extractAllClaims(String jwt);
    public String generateToken(Map<String, Object> extraClaims, Long userId);
    public String generateToken(Long userId);
    public boolean isTokenValid(String jwt, Long userId);
    public boolean isTokenExpired(String jwt);
    public Date extractExpiration(String jwt);
    
}
