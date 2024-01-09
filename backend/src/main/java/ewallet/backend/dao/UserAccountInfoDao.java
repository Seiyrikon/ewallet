package ewallet.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.UserAccountInfoModel;
import ewallet.backend.model.tbl_user_mst;

@Mapper
public interface UserAccountInfoDao 
{
    List<UserAccountInfoModel> getUserAccountInfo(Long userId);

    List<UserAccountInfoModel> searchUserByUsername(String username);
}
