package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.model.tbl_personal_info_mst;
import ewallet.backend.service.tbl_personal_info_mstService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class tbl_personal_info_mstRestController 
{
    @Autowired
    private tbl_personal_info_mstService TBL_PERSONAL_INFO_MSTService;

    @GetMapping("personal-info/{userId}")
    public ResponseEntity<Map<String, Object>> getUserPersonalInfo(@PathVariable Long userId) 
    {
        return TBL_PERSONAL_INFO_MSTService.getUserPersonalInfo(userId);
    }

    @PostMapping("personal-info/insert")
    public ResponseEntity<Map<String, Object>> insertPersonalInfo(@RequestBody tbl_personal_info_mst body, Long username) 
    {
        return TBL_PERSONAL_INFO_MSTService.insertPersonalInfo(body, username);
    }
    
}
