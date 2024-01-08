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

import ewallet.backend.dao.tbl_confirm_request_mstDao;
import ewallet.backend.dao.tbl_friend_request_mstDao;
import ewallet.backend.dto.tbl_friend_request_mstDto;
import ewallet.backend.dto.mapper.tbl_friend_request_mstDtoMapper;
import ewallet.backend.service.tbl_friend_request_mstService;

@Service
public class tbl_friend_request_mstServiceImpl implements tbl_friend_request_mstService
{

    @Autowired
    private tbl_friend_request_mstDao tbl_friend_request_mstDao;

    @Autowired
    private tbl_confirm_request_mstDao tbl_confirm_request_mstDao;

    @Autowired
    private tbl_friend_request_mstDtoMapper tbl_friend_request_mstDtoMapper;

    Map<String, Object> response = new HashMap<String, Object>();
    List<tbl_friend_request_mstDto> requests = new ArrayList<tbl_friend_request_mstDto>();

    @Override
    public ResponseEntity<Map<String, Object>> getAllFriendRequestofUser() 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());

                requests = tbl_friend_request_mstDao.getAllFriendRequestofUser(userId)
                .stream()
                .map(tbl_friend_request_mstDtoMapper).collect(Collectors.toList());
    
                if(requests.size() != 0)

                {
                    response.put("message", requests);
                }
                else
                {
                    response.put("message", "You haven't added anyone yet");
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

    @Override
    public ResponseEntity<Map<String, Object>> insertFriendRequest(Long requesteeId) 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the username of the logged in user
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());
                
                if(requesteeId != null)
                {
                    tbl_friend_request_mstDao.insertFriendRequest(userId, requesteeId);
                    tbl_confirm_request_mstDao.insertConfirmRequest(requesteeId, userId);
                    response.put("message", "Friend Request Sent");
                }
                else
                {
                    response.put("message", "Something went wrong");
                    return ResponseEntity.status(401).body(response);
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
