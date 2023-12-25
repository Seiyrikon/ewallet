package ewallet.backend.service.serviceimpl;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import ewallet.backend.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtServiceImpl implements JwtService
{

    private static final String SECRET_KEY = "A404AD4B5E8655F686922AB29CB59052DBD8018487D8DC95E8D0F2A6EE2E775F";

    @Override
    public String extractUsername(String jwt) 
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
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) 
    {
        return Jwts
            .builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    @Override
    public String generateToken(UserDetails userDetails) 
    {
        return generateToken(new HashMap<>(), userDetails);
    }

    @Override
    public boolean isTokenValid(String jwt, UserDetails userDetails) 
    {
        final String username = extractUsername(jwt);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(jwt);
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

}
