package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.service.TotalBalanceService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class TotalBalanceRestController 
{
    @Autowired
    private TotalBalanceService totalBalanceService;

    @GetMapping("total-balance/{walletId}")
    public ResponseEntity<Map<String, Object>> getTotalBalancePerWallet(@PathVariable Long walletId)
    {
        return totalBalanceService.getTotalBalancePerWallet(walletId);
    }

    // @GetMapping("over-all-balance")
    // public ResponseEntity<Map<String, Object>> getOverAllBalancePerUser()
    // {
    //     return totalBalanceService.getOverAllBalancePerUser();
    // }
}
