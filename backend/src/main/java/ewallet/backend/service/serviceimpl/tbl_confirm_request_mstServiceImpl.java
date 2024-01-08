package ewallet.backend.service.serviceimpl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_friend_request_mstDao;
import ewallet.backend.dao.tbl_user_friend_mstDao;
import ewallet.backend.service.tbl_confirm_request_mstService;

@Service
public class tbl_confirm_request_mstServiceImpl implements tbl_confirm_request_mstService
{

    @Autowired
    private tbl_user_friend_mstDao tbl_user_friend_mstDao;

    @Autowired
    private tbl_friend_request_mstDao tbl_friend_request_mstDao;

    Map<String, Object> response = new HashMap<String, Object>();

    @Override
    public ResponseEntity<Map<String, Object>> cofirmRequest(Long requestedId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the username of the logged in user
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());
                
                if(requestedId != null)
                {
                    tbl_user_friend_mstDao.insertFriend(userId, requestedId);
                    tbl_user_friend_mstDao.insertFriend(requestedId, userId);
                    tbl_friend_request_mstDao.deleteFriendRequest(userId, requestedId);
                    response.put("message", "Friend Request Confirmed");
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
    

