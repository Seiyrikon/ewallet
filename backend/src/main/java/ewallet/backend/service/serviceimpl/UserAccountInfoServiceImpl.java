package ewallet.backend.service.serviceimpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.UserAccountInfoDao;
import ewallet.backend.dto.UserAccountInfoDto;
import ewallet.backend.dto.mapper.UserAccountInfoDtoMapper;
import ewallet.backend.service.UserAccountInfoService;

@Service
public class UserAccountInfoServiceImpl implements UserAccountInfoService
{
    @Autowired
    private UserAccountInfoDao userAccountInfoDao;

    @Autowired
    private UserAccountInfoDtoMapper userAccountInfoDtoMapper;

    List<UserAccountInfoDto> userAccountInfo = new ArrayList<UserAccountInfoDto>();
    Map<String, Object> response = new HashMap<String, Object>();

    @Override
    public ResponseEntity<Map<String, Object>> getUserAccountInfo(Long userId) 
    {
        try 
        {
            userAccountInfo = userAccountInfoDao.getUserAccountInfo(userId)
            .stream()
            .map(userAccountInfoDtoMapper).collect(Collectors.toList());

            if (userAccountInfo.size() != 0) 
            {
                response.put("message", userAccountInfo);
            }
            else
            {
                response.put("message", "User not found");
                return ResponseEntity.status(404).body(response);
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
