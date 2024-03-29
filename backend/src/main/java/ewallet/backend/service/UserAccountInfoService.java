package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import ewallet.backend.model.UserAccountInfoModel;

public interface UserAccountInfoService 
{
    public ResponseEntity<Map<String, Object>> getAllUserAccountInfo();
    public ResponseEntity<Map<String, Object>> getUserAccountInfo(Long userId);
    
    public ResponseEntity<Map<String, Object>> updateUserAccount(UserAccountInfoModel body);
    
    public ResponseEntity<Map<String, Object>> searchUserByUsername(String username);

}
