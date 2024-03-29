package ewallet.backend.service.serviceimpl;

import java.sql.Timestamp;
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
import org.springframework.web.multipart.MultipartFile;

import ewallet.backend.dao.UserAccountInfoDao;
import ewallet.backend.dao.tbl_personal_info_mstDao;
import ewallet.backend.dao.tbl_profile_pictureDao;
import ewallet.backend.dao.tbl_user_mstDao;
import ewallet.backend.dto.UserAccountInfoDto;
import ewallet.backend.dto.mapper.UserAccountInfoDtoMapper;
import ewallet.backend.model.UserAccountInfoModel;
import ewallet.backend.model.tbl_personal_info_mst;
import ewallet.backend.model.tbl_user_mst;
import ewallet.backend.service.UserAccountInfoService;

@Service
public class UserAccountInfoServiceImpl implements UserAccountInfoService
{
    @Autowired
    private UserAccountInfoDao userAccountInfoDao;

    @Autowired
    private UserAccountInfoDtoMapper userAccountInfoDtoMapper;

    @Autowired
    private tbl_user_mstDao tbl_user_mstDao;

    @Autowired
    private tbl_personal_info_mstDao tbl_personal_info_mstDao;

    @Autowired
    private tbl_profile_pictureDao tbl_profile_pictureDao;

    List<UserAccountInfoDto> userAccountInfo = new ArrayList<UserAccountInfoDto>();
    Map<String, Object> response = new HashMap<String, Object>();
    List<tbl_user_mst> allUser = new ArrayList<tbl_user_mst>();
    tbl_user_mst principal = new tbl_user_mst();
    tbl_user_mst userBody = new tbl_user_mst();
    tbl_personal_info_mst personalInfoBody = new tbl_personal_info_mst();

    @Override
    public ResponseEntity<Map<String, Object>> getUserAccountInfo(Long userId) 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        try {
            // Check if the user is authenticated
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                // Long userId = Long.parseLong(authentication.getName());
                
                //fetch all the info of user from db using it's userId
                userAccountInfo = userAccountInfoDao.getUserAccountInfo(userId)
                .stream()
                .map(userAccountInfoDtoMapper).collect(Collectors.toList());

                if(userAccountInfo.size() != 0)
                {
                    response.put("message", userAccountInfo);
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

    @Override
    public ResponseEntity<Map<String, Object>> updateUserAccount(UserAccountInfoModel body)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        try {
            // Check if the user is authenticated
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());

                allUser = tbl_user_mstDao.getAllUser();

                principal = tbl_user_mstDao.getUserById(userId);
                
                for(tbl_user_mst user : allUser)
                {
                    if(user.getUsername().equals(principal.getUsername()))
                    {

                    } 
                    else 
                    {
                        if(user.getUsername().equals(body.getUsername()))
                        {
                            response.put("message", "Username Already Taken");
                            return ResponseEntity.status(409).body(response);
                        }
                    }
                }

                Timestamp updateTimestamp = new Timestamp(System.currentTimeMillis());

                // Check if a new profile picture is provided
                

                userBody.setUsername(body.getUsername());
                userBody.setUpdated_at(updateTimestamp);
                tbl_user_mstDao.updateUser(userId, userBody);

                personalInfoBody.setFirstName(body.getFirstName());
                personalInfoBody.setMiddleName(body.getMiddleName());
                personalInfoBody.setLastName(body.getLastName());
                personalInfoBody.setUpdated_at(updateTimestamp);
                tbl_personal_info_mstDao.updatePersonalInfo(userId, personalInfoBody);

                response.put("message", "Update Success");
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
    public ResponseEntity<Map<String, Object>> searchUserByUsername(String username) 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        try {
            // Check if the user is authenticated
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                // Long userId = Long.parseLong(authentication.getName());
                
                //fetch all the info of user from db using it's userId
                userAccountInfo = userAccountInfoDao.searchUserByUsername(username)
                .stream()
                .map(userAccountInfoDtoMapper).collect(Collectors.toList());

                if(userAccountInfo.size() != 0)
                {
                    response.put("message", userAccountInfo);
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

    @Override
    public ResponseEntity<Map<String, Object>> getAllUserAccountInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        try {
            // Check if the user is authenticated
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());
                
                //fetch all the info of user from db using it's userId
                userAccountInfo = userAccountInfoDao.getAllUserAccountInfo(userId)
                .stream()
                .map(userAccountInfoDtoMapper).collect(Collectors.toList());

                if(userAccountInfo.size() != 0)
                {
                    response.put("message", userAccountInfo);
                }
                else
                {
                    response.put("message", "No users yet");
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
