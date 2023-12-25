package ewallet.backend.service;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;

import io.jsonwebtoken.Claims;

public interface JwtService 
{
    public String extractUsername(String jwt);
    public <T> T extractClaim(String jwt, Function<Claims, T> claimsResolver);
    public Claims extractAllClaims(String jwt);
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails);
    public String generateToken(UserDetails userDetails);
    public boolean isTokenValid(String jwt, UserDetails userDetails);
    public boolean isTokenExpired(String jwt);
    public Date extractExpiration(String jwt);
}
