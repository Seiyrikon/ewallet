package ewallet.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.tbl_confirm_request_mst;

@Mapper
public interface tbl_confirm_request_mstDao 
{
    List<tbl_confirm_request_mst> getAllFriendRequestofUser(Long userId);
    void insertConfirmRequest(Long requestedId, Long requestingId);

    void deleteConfirmRequest(Long requestedId, Long requestingId);
}
