package ewallet.backend.service.serviceimpl;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_invalid_tokenDao;
import ewallet.backend.model.tbl_invalid_token;
import ewallet.backend.service.tbl_invalid_tokenService;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class tbl_invalid_tokenServiceImpl implements tbl_invalid_tokenService
{
    @Autowired
    private tbl_invalid_tokenDao tbl_invalid_tokenDao;

    Map<String, Object> response = new HashMap<String, Object>();

    @Override
    public ResponseEntity<Map<String, Object>> getInvalidToken(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        jwt = authHeader.substring(7);

        try {
            // Check if the user is authenticated
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());
                
                tbl_invalid_tokenDao.insertInvalidToken(userId, jwt);

                response.put("message", "Logout Successful");
            } 
            else 
            {
                response.put("message", "You must login first");
                return ResponseEntity.status(403).body(response);
            }
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
            response.put("message", "Internal Server Error");
            return ResponseEntity.status(500).body(response);
        }
        return ResponseEntity.ok(response);
    }
}
