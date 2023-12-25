package ewallet.backend.service.serviceimpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_user_mstDao;
import ewallet.backend.dto.tbl_user_mstDto;
import ewallet.backend.dto.mapper.tbl_user_mstDtoMapper;
import ewallet.backend.model.tbl_user_mst;
import ewallet.backend.service.tbl_user_mstService;

@Service
public class tbl_user_mstServiceImpl implements tbl_user_mstService
{
    
    @Autowired
    private tbl_user_mstDao TBL_USER_MSTDao;

    @Autowired
    private tbl_user_mstDtoMapper TBL_USER_MSTDtoMapper;

    List<tbl_user_mstDto> userAccount = new ArrayList<tbl_user_mstDto>();
    tbl_user_mst user = new tbl_user_mst();
    Map<String, Object> response = new HashMap<String, Object>();
    
    @Override
    public ResponseEntity<Map<String, Object>> getUserAccount(Long userId) 
    {
        try 
        {
            userAccount = TBL_USER_MSTDao.getUserAccount(userId)
            .stream()
            .map(TBL_USER_MSTDtoMapper).collect(Collectors.toList());

            if(userAccount.size() != 0)
            {
                response.put("message", userAccount);
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

    @Override
    public ResponseEntity<Map<String, Object>> insertUser(tbl_user_mst body) 
    {
        try 
        {
            if(body != null) 
            {
                TBL_USER_MSTDao.insertUser(body); 
                response.put("message", "Success");
            } 
            else 
            {
                response.put("message", "Something went wrong");
                return ResponseEntity.status(401).body(response);
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
    public ResponseEntity<Map<String, Object>> findByUsername(String USERNAME) 
    {
        try 
        {
            user = TBL_USER_MSTDao.findByUsername(USERNAME);
            
            if(user != null) 
            {
                response.put("message", user);
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

    @Override
    public tbl_user_mst loadByUsername(String username) 
    {
        try 
        {
            user = TBL_USER_MSTDao.loadByUsername(username);
            
            if(user == null) 
            {
                throw new UsernameNotFoundException("User not found");
            }
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
            throw new InternalError("Internal Server Error");
        }
        return user;
    }
}
