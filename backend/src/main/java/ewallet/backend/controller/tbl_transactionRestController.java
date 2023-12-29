package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.service.tbl_transactionService;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class tbl_transactionRestController 
{
    @Autowired
    private tbl_transactionService tbl_transactionService;
    
    @GetMapping("transactions/{walletId}")
    public ResponseEntity<Map<String, Object>> getAllTransactionPerWallet(@PathVariable Long walletId)
    {
        return tbl_transactionService.getAllTransactionPerWallet(walletId);
    }

    @GetMapping("all-transactions")
    public ResponseEntity<Map<String, Object>> getAllTransactionPerUser() 
    {
        return tbl_transactionService.getAllTransactionPerUser();
    }
    

}
