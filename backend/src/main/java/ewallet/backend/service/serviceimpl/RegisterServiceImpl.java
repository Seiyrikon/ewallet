package ewallet.backend.service.serviceimpl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_personal_info_mstDao;
import ewallet.backend.dao.tbl_user_mstDao;
import ewallet.backend.model.RegisterModel;
import ewallet.backend.model.tbl_personal_info_mst;
import ewallet.backend.model.tbl_user_mst;
import ewallet.backend.service.JwtService;
import ewallet.backend.service.ResgisterService;

@Service
public class RegisterServiceImpl implements ResgisterService
{

    @Autowired
    private tbl_user_mstDao TBL_USER_MSTDao;

    @Autowired
    private tbl_personal_info_mstDao TBL_PERSONAL_INFO_MSTDao;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private JwtService jwtService;

    tbl_user_mst userAccount = new tbl_user_mst();
    tbl_personal_info_mst personalInfo = new tbl_personal_info_mst();
    tbl_user_mst user = new tbl_user_mst();

    Map<String, Object> response = new HashMap<String, Object>();

    @Override
    public ResponseEntity<Map<String, Object>> register(RegisterModel body) 
    {
        try 
        {
            if(body != null)
            {
                //returns an error message if username is already taken
                user = TBL_USER_MSTDao.findByUsername(body.getUsername());
                if(user != null)
                {
                    response.put("message", "Username Already Taken");
                    return ResponseEntity.status(403).body(response);
                }

                //sets the value of client inputs to userAccount
                userAccount.setUsername(body.getUsername());
                //password hashing
                userAccount.setPassword(bCryptPasswordEncoder.encode(body.getPassword()));

                //saves the values of userAccount to TBL_USER_MST
                TBL_USER_MSTDao.insertUser(userAccount);

                //saves the fetched value to user
                user = TBL_USER_MSTDao.findByUsername(userAccount.getUsername());

                //sets the value of client inputs to personalInfo
                personalInfo.setFirstName(body.getFirstName());
                personalInfo.setMiddleName(body.getMiddleName());
                personalInfo.setLastName(body.getLastName());

                //saves the USER_ID of user to variable USER_ID
                //USER_ID is necessary for saving personalInfo as it is a 
                //foreign key of TBL_PERSONAL_INFO_MST
                Long USER_ID = user.getUserId();

                //saves the values of personalInfo to TBL_PERSONAL_INFO_MST
                TBL_PERSONAL_INFO_MSTDao.insertPersonalInfo(personalInfo, USER_ID);

                var jwt = jwtService.generateToken(user);
                response.put("message", jwt);
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
    
}
