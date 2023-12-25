package ewallet.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.tbl_deposit;

@Mapper
public interface tbl_depositDao 
{
    List<tbl_deposit> getAllDepositPerWallet(Long userId, Long walletId);
    void insertDeposit(tbl_deposit body);
    Double getTotalDepositPerWallet(Long userId, Long walletId);
}
