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

import ewallet.backend.dao.tbl_wallet_mstDao;
import ewallet.backend.dto.tbl_wallet_mstDto;
import ewallet.backend.dto.mapper.tbl_wallet_mstDtoMapper;
import ewallet.backend.model.tbl_wallet_mst;
import ewallet.backend.service.tbl_wallet_mstService;

@Service
public class tbl_wallet_mstServiceImpl implements tbl_wallet_mstService
{

    @Autowired
    private tbl_wallet_mstDao tbl_wallet_mstDao;

    @Autowired
    private tbl_wallet_mstDtoMapper tbl_wallet_mstDtoMapper;

    List<tbl_wallet_mstDto> wallets = new ArrayList<tbl_wallet_mstDto>();
    tbl_wallet_mst wallet = new tbl_wallet_mst();
    Map<String, Object> response = new HashMap<String, Object>();
    
    @Override
    public ResponseEntity<Map<String, Object>> getAllWallet() 
    {
        try 
        {
            wallets = tbl_wallet_mstDao.getAllWallet()
            .stream()
            .map(tbl_wallet_mstDtoMapper).collect(Collectors.toList());

            if(wallets.size() != 0)
            {
                response.put("message", wallets);
            }
            else
            {
                response.put("message", "No Wallets Yet");
                return ResponseEntity.status(404).body(response);
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
    public ResponseEntity<Map<String, Object>> getAllUserWallet() 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());

                wallets = tbl_wallet_mstDao.getAllUserWallet(userId)
                .stream()
                .map(tbl_wallet_mstDtoMapper).collect(Collectors.toList());
    
                if(wallets.size() != 0)
                {
                    response.put("message", wallets);
                }
                else
                {
                    response.put("message", "No Wallets Yet");
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
    public ResponseEntity<Map<String, Object>> insertWallet(tbl_wallet_mst body) 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the username of the logged in user
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());
                
                if(body != null)
                {
                    body.setUser_id(userId);
                    tbl_wallet_mstDao.insertWallet(body);
                    response.put("message", "Wallet Created Successfully");
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
    public ResponseEntity<Map<String, Object>> getWalletById(Long walletId) 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());
    
                wallets = tbl_wallet_mstDao.getWalletById(userId, walletId)
                .stream()
                .map(tbl_wallet_mstDtoMapper).collect(Collectors.toList());

                if(wallets.size() != 0) 
                {
                    response.put("message", wallets);
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
    public ResponseEntity<Map<String, Object>> logicalDeleteWalletById(Long walletId) 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());
                
                if(walletId != null)
                {
                    tbl_wallet_mstDao.logicalDeleteWalletById(userId, walletId);
                    response.put("message", "Wallet Deleted Successfully");
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
    public ResponseEntity<Map<String, Object>> getAllWalletOfUser(Long user_id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());

                wallets = tbl_wallet_mstDao.getAllWalletOfUser(user_id)
                .stream()
                .map(tbl_wallet_mstDtoMapper).collect(Collectors.toList());
    
                if(wallets.size() != 0)
                {
                    response.put("message", wallets);
                }
                else
                {
                    response.put("message", "This user have no wallet/s.");
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
