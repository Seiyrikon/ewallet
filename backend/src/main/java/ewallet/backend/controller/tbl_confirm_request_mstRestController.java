package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.service.tbl_confirm_request_mstService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class tbl_confirm_request_mstRestController 
{
    @Autowired
    private tbl_confirm_request_mstService tbl_confirm_request_mstService;

    @GetMapping("user/confirm-request/all")
    public ResponseEntity<Map<String, Object>> getAllConfirmRequestOfUser()
    {
        return tbl_confirm_request_mstService.getAllConfirmRequest();
    }
}
