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
import ewallet.backend.dao.tbl_wallet_mstDao;
import ewallet.backend.dao.tbl_withdrawDao;
import ewallet.backend.model.tbl_wallet_mst;
import ewallet.backend.service.TotalBalanceService;

@Service
public class TotalBalanceServiceImpl implements TotalBalanceService
{

    @Autowired
    private tbl_depositDao tbl_depositDao;

    @Autowired
    private tbl_withdrawDao tbl_withdrawDao;

    @Autowired
    private tbl_wallet_mstDao tbl_wallet_mstDao;

    Map<String, Object> response = new HashMap<String, Object>();
    Double totalBalance = 0.00;

    @Override
    public ResponseEntity<Map<String, Object>> getTotalBalancePerWallet(Long user_id, Long walletId) 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());

                List<tbl_wallet_mst> wallets = new ArrayList<tbl_wallet_mst>();
    
                wallets = tbl_wallet_mstDao.getWalletById(user_id, walletId);

                if(wallets.size() != 0) 
                {
                    Double totalWithdraw = tbl_withdrawDao.getTotalWithdrawPerWallet(user_id, walletId);
                    Double totalDeposit = tbl_depositDao.getTotalDepositPerWallet(user_id, walletId);

                    if(totalWithdraw == null || totalDeposit == null)
                    {
                        if(totalWithdraw == null && totalDeposit == null)
                        {
                            totalBalance = 0.00;
                            totalWithdraw = 0.00;
                            totalDeposit = 0.00;
                            totalBalance = totalDeposit - totalWithdraw;
                            response.put("message", totalBalance);
                        }
                        if(totalWithdraw == null && totalDeposit != null)
                        {
                            totalBalance = 0.00;
                            totalWithdraw = 0.00;
                            totalBalance = totalDeposit - totalWithdraw;
                            response.put("message", totalBalance);
                        }
                        if(totalDeposit == null && totalWithdraw != null)
                        {
                            totalBalance = 0.00;
                            totalDeposit = 0.00;
                            totalBalance = totalDeposit - totalWithdraw;
                            response.put("message", totalBalance);
                        }
                    }
                    else 
                    {
                        totalBalance = 0.00;
                        totalBalance = totalDeposit - totalWithdraw;
                        response.put("message", totalBalance);
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

    @Override
    public ResponseEntity<Map<String, Object>> getOverAllBalancePerUser() 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());

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
