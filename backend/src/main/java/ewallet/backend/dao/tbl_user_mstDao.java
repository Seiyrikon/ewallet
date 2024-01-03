package ewallet.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.tbl_user_mst;

@Mapper
public interface tbl_user_mstDao
{
    
    List<tbl_user_mst> getUserAccount(Long userId);

    void insertUser(tbl_user_mst body);

    void updateUser(Long user_id, tbl_user_mst body);
    
    tbl_user_mst findByUsername(String username);
    
    tbl_user_mst loadByUsername(String username);

    tbl_user_mst getUserById(Long userId);
    
}
