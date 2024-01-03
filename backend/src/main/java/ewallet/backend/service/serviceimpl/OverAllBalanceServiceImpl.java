package ewallet.backend.service.serviceimpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_depositDao;
import ewallet.backend.dao.tbl_user_mstDao;
import ewallet.backend.dao.tbl_wallet_mstDao;
import ewallet.backend.dao.tbl_withdrawDao;
import ewallet.backend.model.tbl_user_mst;
import ewallet.backend.model.tbl_wallet_mst;
import ewallet.backend.service.OverAllBalanceService;
import ewallet.backend.service.TotalBalanceService;

@Service
public class OverAllBalanceServiceImpl implements OverAllBalanceService
{
    
    @Autowired
    private tbl_user_mstDao tbl_user_mstDao;

    @Autowired
    private tbl_wallet_mstDao tbl_wallet_mstDao;

    @Autowired
    private TotalBalanceService totalBalanceService;

    @Autowired
    private tbl_depositDao tbl_depositDao;

    @Autowired
    private tbl_withdrawDao tbl_withdrawDao;

    Map<String, Object> response = new HashMap<String, Object>();

    @Override
    public ResponseEntity<Map<String, Object>> getOverAllBalancePerUser() 
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
    
                wallets = tbl_wallet_mstDao.getAllUserWallet(userId);

                if(wallets.size() != 0) 
                {
                    Double overAllBalance = 0.00;
                    Double totalBalance = 0.00;

                    for(tbl_wallet_mst wallet : wallets)
                    {
                        Double totalWithdraw = tbl_withdrawDao.getTotalWithdrawPerWallet(userId, wallet.getWallet_id());
                        Double totalDeposit = tbl_depositDao.getTotalDepositPerWallet(userId, wallet.getWallet_id());
    
                        if(totalWithdraw == null || totalDeposit == null)
                        {
                            if(totalWithdraw == null && totalDeposit == null)
                            {
                                overAllBalance = 0.00;
                                totalBalance = 0.00;
                                totalWithdraw = 0.00;
                                totalDeposit = 0.00;
                                totalBalance = totalDeposit - totalWithdraw;

                                overAllBalance += totalBalance;

                                response.put("message", overAllBalance);
                            }
                            if(totalWithdraw == null && totalDeposit != null)
                            {
                                overAllBalance = 0.00;
                                totalBalance = 0.00;
                                totalWithdraw = 0.00;
                                totalBalance = totalDeposit - totalWithdraw;
                                
                                overAllBalance += totalBalance;

                                response.put("message", overAllBalance);
                            }
                            if(totalDeposit == null && totalWithdraw != null)
                            {
                                overAllBalance = 0.00;
                                totalBalance = 0.00;
                                totalDeposit = 0.00;
                                totalBalance = totalDeposit - totalWithdraw;

                                overAllBalance += totalBalance;

                                response.put("message", overAllBalance);
                            }
                        }
                        else 
                        {
                            overAllBalance = 0.00;
                            totalBalance = 0.00;
                            totalBalance = totalDeposit - totalWithdraw;

                            overAllBalance += totalBalance;

                            response.put("message", overAllBalance);
                        }
                    }
                }
                else
                {
                    response.put("message", ""); //Displays an empty string to frontend
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
