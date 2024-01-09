package ewallet.backend.service.serviceimpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_confirm_request_mstDao;
import ewallet.backend.dao.tbl_friend_request_mstDao;
import ewallet.backend.dao.tbl_user_friend_mstDao;
import ewallet.backend.dto.tbl_friend_request_mstDto;
import ewallet.backend.service.FriendFeatureService;

@Service
public class FriendFeatureServiceImpl implements FriendFeatureService
{
    @Autowired
    private tbl_user_friend_mstDao tbl_user_friend_mstDao;

    @Autowired
    private tbl_friend_request_mstDao tbl_friend_request_mstDao;

    @Autowired
    private tbl_confirm_request_mstDao tbl_confirm_request_mstDao;

    Map<String, Object> response = new HashMap<String, Object>();
    List<tbl_friend_request_mstDto> requests = new ArrayList<tbl_friend_request_mstDto>();

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

    @Override
    public ResponseEntity<Map<String, Object>> acceptFriendButton(Long friendId) 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the username of the logged in user
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());
                
                if(friendId != null)
                {
                    tbl_user_friend_mstDao.insertFriend(userId, friendId);
                    tbl_user_friend_mstDao.insertFriend(friendId, userId);
                    tbl_friend_request_mstDao.deleteFriendRequest(userId, friendId);
                    tbl_confirm_request_mstDao.deleteConfirmRequest(friendId, userId);
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

    @Override
    public ResponseEntity<Map<String, Object>> declineFriendRequest(Long friendId) 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the username of the logged in user
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());
                
                if(friendId != null)
                {
                    tbl_friend_request_mstDao.deleteFriendRequest(userId, friendId);
                    tbl_confirm_request_mstDao.deleteConfirmRequest(friendId, userId);
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
