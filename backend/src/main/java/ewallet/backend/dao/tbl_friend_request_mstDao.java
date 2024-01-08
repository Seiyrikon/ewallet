package ewallet.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.tbl_friend_request_mst;

@Mapper
public interface tbl_friend_request_mstDao 
{
    List<tbl_friend_request_mst> getAllFriendRequestofUser(Long requestorId);
    void insertFriendRequest(Long requestorId, Long requesteeId);
    void deleteFriendRequest(Long requestorId, Long requesteeId);
}
