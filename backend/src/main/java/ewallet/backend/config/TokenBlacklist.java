package ewallet.backend.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TokenBlacklist 
{
    private List<String> invalidatedTokens = new ArrayList<String>();

    public void invalidateToken(String token) 
    {
        invalidatedTokens.add(token);
    }

    public boolean isTokenInvalidated(String token) 
    {
        return invalidatedTokens.contains(token);
    }
}
