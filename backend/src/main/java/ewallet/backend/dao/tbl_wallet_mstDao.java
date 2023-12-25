package ewallet.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.tbl_wallet_mst;

@Mapper
public interface tbl_wallet_mstDao 
{
    List<tbl_wallet_mst> getAllWallet();
    List<tbl_wallet_mst> getAllUserWallet(Long userId);
    void insertWallet(tbl_wallet_mst body);
    List<tbl_wallet_mst> getWalletById(Long userId, Long walletId);

}
