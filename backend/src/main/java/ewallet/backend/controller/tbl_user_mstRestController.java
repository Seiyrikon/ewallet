package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.model.tbl_user_mst;
import ewallet.backend.service.tbl_user_mstService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class tbl_user_mstRestController 
{
    @Autowired
    private tbl_user_mstService TBL_USER_MSTService;

    @GetMapping("users/{userId}")
    public ResponseEntity<Map<String, Object>> getUserAccount(@PathVariable Long userId) 
    {
        return TBL_USER_MSTService.getUserAccount(userId);
    }

    @PostMapping("user/insert")
    public ResponseEntity<Map<String, Object>> insertUser(@RequestBody tbl_user_mst body) 
    {
        return TBL_USER_MSTService.insertUser(body);
    }
    
    @GetMapping("user/{userId}")
    public ResponseEntity<Map<String, Object>> findByUsername(@PathVariable String username) {
        return TBL_USER_MSTService.findByUsername(username);
    }

    @GetMapping("load-user/{userId}")
    public tbl_user_mst loadByUsername(@PathVariable String username) {
        return TBL_USER_MSTService.loadByUsername(username);
    }
    
    
}
