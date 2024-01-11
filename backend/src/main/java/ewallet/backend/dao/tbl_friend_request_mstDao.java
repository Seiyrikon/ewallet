package ewallet.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.tbl_friend_request_mst;

@Mapper
public interface tbl_friend_request_mstDao 
{
    List<tbl_friend_request_mst> getAllFriendRequestofUser(Long requestorId);
    tbl_friend_request_mst friendRequestChecker(Long requestorId, Long requesteeId);
    void insertFriendRequest(Long requestorId, Long requesteeId);
    void deleteFriendRequest(Long requestorId, Long requesteeId);
}
