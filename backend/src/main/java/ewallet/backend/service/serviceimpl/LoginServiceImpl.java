package ewallet.backend.service.serviceimpl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_user_mstDao;
import ewallet.backend.model.LoginModel;
import ewallet.backend.model.tbl_user_mst;
import ewallet.backend.service.JwtService;
import ewallet.backend.service.LoginService;

@Service
public class LoginServiceImpl implements LoginService
{

    @Autowired
    private tbl_user_mstDao TBL_USER_MSTDao;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    tbl_user_mst user = new tbl_user_mst();
    Map<String, Object> response = new HashMap<String, Object>();

    @Override
    public ResponseEntity<Map<String, Object>> login(LoginModel body) 
    {
        try 
        {
            user = TBL_USER_MSTDao.findByUsername(body.getUsername());

            if(user != null) 
            {
                if(bCryptPasswordEncoder.matches(body.getPassword(), user.getPassword())) 
                {
                    response.put("message", "Login Successful");
                }
                else
                {
                    response.put("message", "Incorrect Password");
                    return ResponseEntity.status(401).body(response);
                }
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
    public ResponseEntity<Map<String, Object>> authenticate(LoginModel body) 
    {
        authenticationManager.authenticate
        (
            new UsernamePasswordAuthenticationToken(
                body.getUsername(), 
                body.getPassword())
        );
        user = TBL_USER_MSTDao.findByUsername(body.getUsername());

        var jwt = jwtService.generateToken(user);
        response.put("message", jwt);
        return ResponseEntity.ok(response);
    }
    
}
