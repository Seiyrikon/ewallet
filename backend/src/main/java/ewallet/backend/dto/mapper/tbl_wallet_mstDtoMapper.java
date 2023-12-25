package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import ewallet.backend.dto.tbl_wallet_mstDto;
import ewallet.backend.model.tbl_wallet_mst;

@Service
public class tbl_wallet_mstDtoMapper implements Function<tbl_wallet_mst, tbl_wallet_mstDto>
{

    @Override
    public tbl_wallet_mstDto apply(tbl_wallet_mst wallet) 
    {
        return new tbl_wallet_mstDto
        (
            wallet.getWallet_name(), 
            wallet.getWallet_desc()
        );
    }
    
}
