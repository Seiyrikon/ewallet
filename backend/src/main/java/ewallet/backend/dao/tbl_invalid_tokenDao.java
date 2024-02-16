package ewallet.backend.dao;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.tbl_invalid_token;

@Mapper
public interface tbl_invalid_tokenDao 
{    
    tbl_invalid_token getInvalidToken(Long user_id, String invalid_token);
    void insertInvalidToken(Long user_id, String invalid_token);
}
