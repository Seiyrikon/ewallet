package ewallet.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.tbl_user_friend_mst;

@Mapper
public interface tbl_user_friend_mstDao 
{
    List<tbl_user_friend_mst> getAllFriendsOfUser(Long userId);

    void insertFriend(Long userId, Long friendId);
}
