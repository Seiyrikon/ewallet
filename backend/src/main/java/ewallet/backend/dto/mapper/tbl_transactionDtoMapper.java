package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_wallet_mstDao;
import ewallet.backend.dto.tbl_transactionDto;
import ewallet.backend.model.tbl_transaction;
import ewallet.backend.model.tbl_wallet_mst;
import ewallet.backend.service.tbl_wallet_mstService;

@Service
public class tbl_transactionDtoMapper implements Function<tbl_transaction, tbl_transactionDto>
{

    @Autowired
    private tbl_wallet_mstDao tbl_wallet_mstDao;
    
    @Override
    public tbl_transactionDto apply(tbl_transaction transaction) 
    {

        String walletName = tbl_wallet_mstDao.getWalletNameById(transaction.getUser_id(), transaction.getWallet_id());

        transaction.setWallet_name(walletName);
        return new tbl_transactionDto
        (
            transaction.getWallet_name(),
            transaction.getTransaction_type(), 
            transaction.getTransaction_amount(), 
            transaction.getTransaction_desc()
        );
    }
    
}
