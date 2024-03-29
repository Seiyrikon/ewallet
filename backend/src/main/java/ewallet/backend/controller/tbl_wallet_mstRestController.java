package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.model.tbl_wallet_mst;
import ewallet.backend.service.tbl_wallet_mstService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class tbl_wallet_mstRestController 
{
    @Autowired
    private tbl_wallet_mstService tbl_wallet_mstService;

    @GetMapping("wallet")
    public ResponseEntity<Map<String, Object>> getAllWallet()
    {
        return tbl_wallet_mstService.getAllWallet();
    }

    @GetMapping("user-wallet")
    public ResponseEntity<Map<String, Object>> getAllUserWallet()
    {
        return tbl_wallet_mstService.getAllUserWallet();
    }

    @PostMapping("wallet/insert")
    public ResponseEntity<Map<String, Object>> insertWallet(@RequestBody tbl_wallet_mst body)
    {
        return tbl_wallet_mstService.insertWallet(body);
    }

    @GetMapping("wallet/{walletId}")
    public ResponseEntity<Map<String, Object>> getWalletById(@PathVariable Long walletId)
    {
        return tbl_wallet_mstService.getWalletById(walletId);
    }

    @PutMapping("wallet/delete/{walletId}")
    public ResponseEntity<Map<String, Object>> logicalDeleteWalletById(@PathVariable Long walletId) {
        return tbl_wallet_mstService.logicalDeleteWalletById(walletId);
    }

    @GetMapping("wallet/user")
    public ResponseEntity<Map<String, Object>> getAllWalletOfUser(@RequestParam Long user_id)
    {
        return tbl_wallet_mstService.getAllWalletOfUser(user_id);
    }
}
