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
import ewallet.backend.dao.tbl_withdrawDao;
import ewallet.backend.dto.tbl_withdrawDto;
import ewallet.backend.dto.mapper.tbl_withdrawDtoMapper;
import ewallet.backend.model.tbl_transaction;
import ewallet.backend.model.tbl_user_mst;
import ewallet.backend.model.tbl_wallet_mst;
import ewallet.backend.model.tbl_withdraw;
import ewallet.backend.service.tbl_withdrawService;

@Service
public class tbl_withdrawServiceImpl implements tbl_withdrawService
{

    @Autowired
    private tbl_withdrawDao tbl_withdrawDao;

    @Autowired
    private tbl_depositDao tbl_depositDao;

    @Autowired
    private tbl_user_mstDao tbl_user_mstDao;

    @Autowired
    private tbl_wallet_mstDao tbl_wallet_mstDao;

    @Autowired
    private tbl_transactionDao tbl_transactionDao;

    @Autowired
    private tbl_withdrawDtoMapper tbl_withdrawDtoMapper;

    tbl_transaction transaction = new tbl_transaction();
    List<tbl_withdrawDto> withdraws = new ArrayList<tbl_withdrawDto>();
    Map<String, Object> response = new HashMap<String, Object>();

    @Override
    public ResponseEntity<Map<String, Object>> getAllWithdrawPerWallet(Long walletId) 
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
                    withdraws = tbl_withdrawDao.getAllWithdrawPerWallet(userId, walletId)
                    .stream()
                    .map(tbl_withdrawDtoMapper).collect(Collectors.toList());

                    if(withdraws.size() != 0)
                    {
                        response.put("message", withdraws);
                    }
                    else 
                    {
                        response.put("message", "No Withdraws Yet");
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
    public ResponseEntity<Map<String, Object>> insertWithdraw(tbl_withdraw body, Long walletId) 
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
                    Double totalDeposit = tbl_depositDao.getTotalDepositPerWallet(userId, walletId);
                    
                    if(totalDeposit == null || body.getAmount() > totalDeposit)
                    {
                        response.put("message", "Insufficient  Funds");
                        return ResponseEntity.status(402).body(response);
                    }
                    else 
                    {
                        body.setUser_id(userId);
                        body.setWallet_id(walletId);
                        tbl_withdrawDao.insertWithdraw(body);
                        
                        //saves transaction to db
                        transaction.setUser_id(userId);
                        transaction.setWallet_id(walletId);
                        transaction.setTransaction_type("Withdraw");
                        transaction.setTransaction_amount(body.getAmount());
                        transaction.setTransaction_desc(body.getWithdraw_desc());
                        tbl_transactionDao.insertTransaction(transaction);

                        response.put("message", "Withdraw Successful");
                    }
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
    public ResponseEntity<Map<String, Object>> getTotalWithdrawPerWallet(Long walletId) 
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
    
                if(withdraws.size() != 0) 
                {
                    Double totalWithdraw = tbl_withdrawDao.getTotalWithdrawPerWallet(userId, walletId);
                    response.put("message", totalWithdraw);
                }
                else
                {
                    response.put("message", "No Withdraws Yet");
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
