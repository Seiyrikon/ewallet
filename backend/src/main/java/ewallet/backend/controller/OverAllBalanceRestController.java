package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.service.OverAllBalanceService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class OverAllBalanceRestController 
{
    @Autowired
    private OverAllBalanceService overAllBalanceService;

    @GetMapping("over-all-balance")
    public ResponseEntity<Map<String, Object>> getOverAllBalancePerUser()
    {
        return overAllBalanceService.getOverAllBalancePerUser();
    }
}
