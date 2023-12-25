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

import ewallet.backend.dao.tbl_transactionDao;
import ewallet.backend.dao.tbl_user_mstDao;
import ewallet.backend.dao.tbl_wallet_mstDao;
import ewallet.backend.dto.tbl_transactionDto;
import ewallet.backend.dto.mapper.tbl_transactionDtoMapper;
import ewallet.backend.model.tbl_user_mst;
import ewallet.backend.model.tbl_wallet_mst;
import ewallet.backend.service.tbl_transactionService;

@Service
public class tbl_transactionServiceImpl implements tbl_transactionService
{
    @Autowired
    private tbl_transactionDao tbl_transactionDao;

    @Autowired
    private tbl_user_mstDao tbl_user_mstDao;

    @Autowired
    private tbl_wallet_mstDao tbl_wallet_mstDao;

    @Autowired
    private tbl_transactionDtoMapper tbl_transactionDtoMapper;

    List<tbl_transactionDto> transactions = new ArrayList<tbl_transactionDto>();
    Map<String, Object> response = new HashMap<String, Object>();

    @Override
    public ResponseEntity<Map<String, Object>> getAllTransactionPerWallet(Long walletId) 
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

                List<tbl_wallet_mst> wallets = new ArrayList<tbl_wallet_mst>();
    
                wallets = tbl_wallet_mstDao.getWalletById(userId, walletId);

                if(wallets.size() != 0) 
                {
                    transactions = tbl_transactionDao.getAllTransactionPerWallet(userId, walletId)
                    .stream()
                    .map(tbl_transactionDtoMapper).collect(Collectors.toList());

                    if(transactions.size() != 0)
                    {
                        response.put("message", transactions);
                    }
                    else 
                    {
                        response.put("message", "No Transactions Yet");
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
