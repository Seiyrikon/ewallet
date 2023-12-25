package ewallet.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.tbl_transaction;

@Mapper
public interface tbl_transactionDao 
{
    List<tbl_transaction> getAllTransactionPerWallet(Long userId, Long walletId);
    void insertTransaction(tbl_transaction body);
}
