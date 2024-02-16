package ewallet.backend.service.serviceimpl;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ewallet.backend.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class JwtServiceImpl implements JwtService
{

    private static final String SECRET_KEY = "A404AD4B5E8655F686922AB29CB59052DBD8018487D8DC95E8D0F2A6EE2E775F";
    Map<String, Object> response = new HashMap<String, Object>();

    @Override
    public String extractUserId(String jwt) 
    {
        return extractClaim(jwt, Claims::getSubject);
    }

    @Override
    public <T> T extractClaim(String jwt, Function<Claims, T> claimsResolver) 
    {
        final Claims claims = extractAllClaims(jwt);
        return claimsResolver.apply(claims);
    }
    
    @Override
    public Claims extractAllClaims(String jwt) 
    {
        return Jwts
            .parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(jwt)
            .getBody();
    }

    private Key getSignInKey() 
    {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    @Override
    public String generateToken(Map<String, Object> extraClaims, Long userId) 
    {
        return Jwts
            .builder()
            .setClaims(extraClaims)
            .setSubject(String.valueOf(userId))
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    @Override
    public String generateToken(Long userId) 
    {
        return generateToken(new HashMap<>(), userId);
    }

    @Override
    public boolean isTokenValid(String jwt, Long userId) 
    {
        final String extractedUserId = extractUserId(jwt);
        return (extractedUserId.equals(String.valueOf(userId))) && !isTokenExpired(jwt);
    }

    @Override
    public boolean isTokenExpired(String jwt) 
    {
        return extractExpiration(jwt).before(new Date());
    }

    @Override
    public Date extractExpiration(String jwt) 
    {
        return extractClaim(jwt, Claims::getExpiration);
    }

    @Override
    public ResponseEntity<Map<String, Object>> getToken(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        jwt = authHeader.substring(7);

        response.put("message", jwt);
        return ResponseEntity.ok(response);
    }

}
