package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.model.tbl_withdraw;
import ewallet.backend.service.tbl_withdrawService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class tbl_withdrawRestController 
{
    @Autowired
    private tbl_withdrawService tbl_withdrawService;

    @GetMapping("withdraw/{walletId}")
    public ResponseEntity<Map<String, Object>> getAllWithdrawPerWallet(@PathVariable Long walletId)
    {
        return tbl_withdrawService.getAllWithdrawPerWallet(walletId);
    }

    @PostMapping("withdraw/insert/{walletId}")
    public ResponseEntity<Map<String, Object>> insertWithdraw(@RequestBody tbl_withdraw body, @PathVariable Long walletId)
    {
        return tbl_withdrawService.insertWithdraw(body, walletId);
    }

    @GetMapping("total-withdraw/{walletId}")
    public ResponseEntity<Map<String, Object>> getTotalWithdrawPerWallet(@PathVariable Long walletId)
    {
        return tbl_withdrawService.getTotalWithdrawPerWallet(walletId);
    }
}
