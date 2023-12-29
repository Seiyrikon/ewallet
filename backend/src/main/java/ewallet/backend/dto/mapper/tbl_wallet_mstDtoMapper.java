package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ewallet.backend.dto.tbl_wallet_mstDto;
import ewallet.backend.model.tbl_wallet_mst;
import ewallet.backend.service.TotalBalanceService;

@Service
public class tbl_wallet_mstDtoMapper implements Function<tbl_wallet_mst, tbl_wallet_mstDto>
{

    @Autowired
    private TotalBalanceService totalBalanceService;

    @Override
    public tbl_wallet_mstDto apply(tbl_wallet_mst wallet) 
    {
        Double balance = Double.parseDouble(totalBalanceService.getTotalBalancePerWallet(wallet.getWallet_id())
                        .getBody().get("message").toString());

        wallet.setBalance(balance);
        return new tbl_wallet_mstDto
        (
            wallet.getWallet_name(), 
            wallet.getWallet_desc(),
            wallet.getBalance()
        );
    }
    
}
