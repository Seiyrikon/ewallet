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

import ewallet.backend.model.tbl_deposit;
import ewallet.backend.service.tbl_depositService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class tbl_depositRestController 
{

    @Autowired
    private tbl_depositService tbl_depositService;

    @GetMapping("deposit/{walletId}")
    public ResponseEntity<Map<String, Object>> getAllDepositPerWallet(@PathVariable Long walletId)
    {
        return tbl_depositService.getAllDepositPerWallet(walletId);
    }

    @PostMapping("insert/deposit/{walletId}")
    public ResponseEntity<Map<String, Object>> insertDeposit(@RequestBody tbl_deposit body, @PathVariable Long walletId)
    {
        return tbl_depositService.insertDeposit(body, walletId);
    }

    @GetMapping("total-deposit/{walletId}")
    public ResponseEntity<Map<String, Object>> getTotalDepositPerWallet(@PathVariable Long walletId)
    {
        return tbl_depositService.getTotalDepositPerWallet(walletId);
    }
}
