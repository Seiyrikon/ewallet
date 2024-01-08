package ewallet.backend.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface tbl_confirm_request_mstDao 
{
    void insertConfirmRequest(Long requestedId, Long requestingId);
}
