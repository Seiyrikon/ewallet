package ewallet.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.PrincipalModel;

@Mapper
public interface PrincipalDao 
{
    List<PrincipalModel> getPrincipal(Long userId);
}
