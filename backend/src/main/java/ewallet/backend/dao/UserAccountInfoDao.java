package ewallet.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.UserAccountInfoModel;

@Mapper
public interface UserAccountInfoDao 
{
    List<UserAccountInfoModel> getUserAccountInfo(Long userId);
}
