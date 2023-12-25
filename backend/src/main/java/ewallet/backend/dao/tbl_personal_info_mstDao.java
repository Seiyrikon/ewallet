package ewallet.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.tbl_personal_info_mst;

@Mapper
public interface tbl_personal_info_mstDao 
{
    List<tbl_personal_info_mst> getUserPersonalInfo(Long userId);

    void insertPersonalInfo(tbl_personal_info_mst body, Long userId);
}
