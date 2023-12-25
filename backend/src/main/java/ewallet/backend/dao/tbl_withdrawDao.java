package ewallet.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.tbl_withdraw;

@Mapper
public interface tbl_withdrawDao 
{
    List<tbl_withdraw> getAllWithdrawPerWallet(Long userId, Long walletId);
    void insertWithdraw(tbl_withdraw body);
    Double getTotalWithdrawPerWallet(Long userId, Long walletId);
}
