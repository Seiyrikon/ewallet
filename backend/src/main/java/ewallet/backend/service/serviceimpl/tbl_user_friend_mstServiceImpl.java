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

import ewallet.backend.dao.tbl_user_friend_mstDao;
import ewallet.backend.dto.tbl_user_friend_mstDto;
import ewallet.backend.dto.mapper.tbl_user_friend_mstDtoMapper;
import ewallet.backend.service.tbl_user_friend_mstService;

@Service
public class tbl_user_friend_mstServiceImpl implements tbl_user_friend_mstService
{

    @Autowired
    private tbl_user_friend_mstDao tbl_user_friend_mstDao;

    @Autowired
    private tbl_user_friend_mstDtoMapper tbl_user_friend_mstDtoMapper;

    Map<String, Object> response = new HashMap<String, Object>();
    List<tbl_user_friend_mstDto> friends = new ArrayList<tbl_user_friend_mstDto>();

    @Override
    public ResponseEntity<Map<String, Object>> getAllFriendsOfUser() 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());

                friends = tbl_user_friend_mstDao.getAllFriendsOfUser(userId)
                .stream()
                .map(tbl_user_friend_mstDtoMapper).collect(Collectors.toList());
    
                if(friends.size() != 0)
                {
                    response.put("message", friends);
                }
                else
                {
                    response.put("message", "No friends Yet");
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
    public ResponseEntity<Map<String, Object>> insertFriend(Long friendId) 
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
                    response.put("message", "Friend Added");
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
    
