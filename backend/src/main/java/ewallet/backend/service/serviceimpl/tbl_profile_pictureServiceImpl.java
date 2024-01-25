package ewallet.backend.service.serviceimpl;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ewallet.backend.dao.tbl_profile_pictureDao;
import ewallet.backend.service.tbl_profile_pictureService;

@Service
public class tbl_profile_pictureServiceImpl implements tbl_profile_pictureService
{
    @Autowired
    private tbl_profile_pictureDao tbl_profile_pictureDao;

    Map<String, Object> response = new HashMap<String,Object>();

    @Override
    public ResponseEntity<Map<String, Object>> insertProfilePicture(MultipartFile profile_picture) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());
                
                if (profile_picture != null && !profile_picture.isEmpty()) {
                    byte[] profilePictureData = profile_picture.getBytes();
                    tbl_profile_pictureDao.insertProfilePicture(userId, profilePictureData);

                    response.put("message", "Image uploaded successfully");
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
