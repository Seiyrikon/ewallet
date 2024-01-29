package ewallet.backend.service.serviceimpl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_depositDao;
import ewallet.backend.dao.tbl_transactionDao;
import ewallet.backend.dao.tbl_withdrawDao;
import ewallet.backend.model.TransferModel;
import ewallet.backend.model.tbl_deposit;
import ewallet.backend.model.tbl_transaction;
import ewallet.backend.model.tbl_withdraw;
import ewallet.backend.service.TotalBalanceService;
import ewallet.backend.service.TransferFundFeatureService;

@Service
public class TransferFundFeatureServiceImpl implements TransferFundFeatureService
{

    @Autowired
    private TotalBalanceService totalBalanceService;

    @Autowired
    private tbl_depositDao tbl_depositDao;

    @Autowired
    private tbl_withdrawDao tbl_withdrawDao;

    @Autowired
    private tbl_transactionDao tbl_transactionDao;

    Map<String, Object> response = new HashMap<String, Object>();
    tbl_transaction transaction = new tbl_transaction();

    @Override
    public ResponseEntity<Map<String, Object>> transferFund(TransferModel body, Long transferFromId, Long transferToId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());

                if(body != null) 
                {
                    ResponseEntity<Map<String, Object>> transferFromWallet = totalBalanceService.getTotalBalancePerWallet(userId, transferFromId);

                    Double transferFromWalletBalance = Double.parseDouble(transferFromWallet.getBody().get("message").toString());

                    if (transferFromWalletBalance < body.getAmount()) 
                    {
                        response.put("message", "Your wallet has insufficient funds");
                        return ResponseEntity.status(402).body(response);
                    }
                    tbl_deposit toBeTransferred = new tbl_deposit();
                    tbl_withdraw toBeWithdrawn = new tbl_withdraw();

                    toBeWithdrawn.setUser_id(userId);
                    toBeWithdrawn.setWallet_id(transferFromId);
                    toBeWithdrawn.setAmount(body.getAmount());
                    toBeWithdrawn.setWithdraw_desc(body.getNote());
                    tbl_withdrawDao.insertWithdraw(toBeWithdrawn);

                    toBeTransferred.setUser_id(userId);
                    toBeTransferred.setWallet_id(transferToId);
                    toBeTransferred.setAmount(body.getAmount());
                    toBeTransferred.setDeposit_desc(body.getNote());
                    tbl_depositDao.insertDeposit(toBeTransferred);

                    //saves transaction to db
                    transaction.setUser_id(userId);
                    transaction.setWallet_id(transferFromId);
                    transaction.setTransaction_type("Transfer");
                    transaction.setTransaction_amount(body.getAmount());
                    transaction.setTransaction_desc(body.getNote());
                    tbl_transactionDao.insertTransaction(transaction);

                    response.put("message", "Transfer Successful");
                }
                else
                {
                    response.put("message", "Something went wrong");
                    return ResponseEntity.status(401).body(response);
                }
            }
            else 
            {
                response.put("message", "You must login first");
                return ResponseEntity.status(403).body(response);
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
    
}
