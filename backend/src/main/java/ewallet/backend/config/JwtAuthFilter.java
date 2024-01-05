package ewallet.backend.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import ewallet.backend.dao.tbl_user_mstDao;
import ewallet.backend.model.tbl_user_mst;
import ewallet.backend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter
{
    private static final String AUTHORIZATION = "Authorization";

    @Autowired
    private JwtService jwtService;

    @Autowired
    private tbl_user_mstDao tbl_user_mstDao;

    @Override
    protected void doFilterInternal(
    @NonNull HttpServletRequest request, 
    @NonNull HttpServletResponse response, 
    @NonNull FilterChain filterChain
    )
    throws ServletException, IOException 
    {
        final String authHeader = request.getHeader(AUTHORIZATION);
        final String jwt;
        final String userId;
        if (authHeader == null || !authHeader.startsWith("Bearer"))
        {
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authHeader.substring(7);
        userId = jwtService.extractUserId(jwt);
        if(userId != null && SecurityContextHolder.getContext().getAuthentication() == null)
        {
            // UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            tbl_user_mst user = tbl_user_mstDao.getUserById(Long.parseLong(userId));
            if(jwtService.isTokenValid(jwt, user.getUserId()))
            {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken
                (
                    user.getUserId(),
                    null,
                    user.getAuthorities()
                );
                authToken.setDetails
                (
                    new WebAuthenticationDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
