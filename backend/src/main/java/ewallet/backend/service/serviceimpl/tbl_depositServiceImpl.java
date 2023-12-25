package ewallet.backend.service.serviceimpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_depositDao;
import ewallet.backend.dao.tbl_transactionDao;
import ewallet.backend.dao.tbl_user_mstDao;
import ewallet.backend.dao.tbl_wallet_mstDao;
import ewallet.backend.dto.tbl_depositDto;
import ewallet.backend.dto.mapper.tbl_depositDtoMapper;
import ewallet.backend.model.tbl_deposit;
import ewallet.backend.model.tbl_transaction;
import ewallet.backend.model.tbl_user_mst;
import ewallet.backend.model.tbl_wallet_mst;
import ewallet.backend.service.tbl_depositService;

@Service
public class tbl_depositServiceImpl implements tbl_depositService
{
    @Autowired
    private tbl_depositDao tbl_depositDao;

    @Autowired
    private tbl_user_mstDao tbl_user_mstDao;

    @Autowired
    private tbl_wallet_mstDao tbl_wallet_mstDao;

    @Autowired
    private tbl_depositDtoMapper tbl_depositDtoMapper;

    @Autowired
    private tbl_transactionDao tbl_transactionDao;

    tbl_transaction transaction = new tbl_transaction();
    List<tbl_depositDto> deposits = new ArrayList<tbl_depositDto>();
    Map<String, Object> response = new HashMap<String, Object>();

    @Override
    public ResponseEntity<Map<String, Object>> getAllDepositPerWallet(Long walletId) 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                String username = authentication.getName();

                //fetch all the info of user from db using it's username
                tbl_user_mst user = tbl_user_mstDao.findByUsername(username);
                
                //gets the userId of the logged in user
                Long userId = user.getUserId();

                List<tbl_wallet_mst> wallets = new ArrayList<tbl_wallet_mst>();
    
                wallets = tbl_wallet_mstDao.getWalletById(userId, walletId);

                if(wallets.size() != 0) 
                {
                    deposits = tbl_depositDao.getAllDepositPerWallet(userId, walletId)
                    .stream()
                    .map(tbl_depositDtoMapper).collect(Collectors.toList());

                    if(deposits.size() != 0)
                    {
                        response.put("message", deposits);
                    }
                    else 
                    {
                        response.put("message", "No Deposits Yet");
                        return ResponseEntity.status(404).body(response);
                    }
                }
                else
                {
                    response.put("message", "Wallet Not Found");
                    return ResponseEntity.status(404).body(response);
                }
            }
            else 
            {
                response.put("message", "You must login first");
                return ResponseEntity.status(403).body(response);
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "Internal Server Error");
            return ResponseEntity.status(500).body(response);
        }
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String, Object>> insertDeposit(tbl_deposit body, Long walletId) 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                String username = authentication.getName();

                //fetch all the info of user from db using it's username
                tbl_user_mst user = tbl_user_mstDao.findByUsername(username);
                
                //gets the userId of the logged in user
                Long userId = user.getUserId();

                if(body != null) 
                {
                    body.setUser_id(userId);
                    body.setWallet_id(walletId);
                    tbl_depositDao.insertDeposit(body);

                    //saves transaction to db
                    transaction.setUser_id(userId);
                    transaction.setWallet_id(walletId);
                    transaction.setTransaction_type("Deposit");
                    transaction.setTransaction_amount(body.getAmount());
                    transaction.setTransaction_desc(body.getDeposit_desc());
                    tbl_transactionDao.insertTransaction(transaction);

                    response.put("message", "Deposit Successful");
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

    @Override
    public ResponseEntity<Map<String, Object>> getTotalDepositPerWallet(Long walletId) 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                String username = authentication.getName();

                //fetch all the info of user from db using it's username
                tbl_user_mst user = tbl_user_mstDao.findByUsername(username);
                
                //gets the userId of the logged in user
                Long userId = user.getUserId();
    
                if(deposits.size() != 0) 
                {
                    Double totalDeposit = tbl_depositDao.getTotalDepositPerWallet(userId, walletId);
                    response.put("message", totalDeposit);
                }
                else
                {
                    response.put("message", "No Deposits Yet");
                    return ResponseEntity.status(404).body(response);
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
