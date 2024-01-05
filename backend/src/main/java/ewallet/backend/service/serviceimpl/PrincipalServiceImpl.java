package ewallet.backend.service.serviceimpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.PrincipalDao;
import ewallet.backend.dto.PrincipalDto;
import ewallet.backend.dto.mapper.PrincipalDtoMapper;
import ewallet.backend.service.PrincipalService;

@Service
public class PrincipalServiceImpl implements PrincipalService 
{

    @Autowired
    private PrincipalDao principalDao;

    @Autowired
    private PrincipalDtoMapper principalDtoMapper;

    List<PrincipalDto> principal = new ArrayList<PrincipalDto>();
    Map<String, Object> response = new HashMap<String, Object>();

    @Override
    public ResponseEntity<Map<String, Object>> getPrincipalInfo() 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        try {
            // Check if the user is authenticated
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());
                
                //fetch all the info of user from db using it's userId
                principal = principalDao.getPrincipal(userId)
                .stream()
                .map(principalDtoMapper).collect(Collectors.toList());

                if(principal.size() != 0)
                {
                    response.put("message", principal);
                }
                else
                {
                    response.put("message", "User not found");
                    return ResponseEntity.status(404).body(response);
                }
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
