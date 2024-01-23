package ewallet.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.ChatInfoModel;
import ewallet.backend.model.tbl_chat;

@Mapper
public interface tbl_chatDao 
{
    public List<tbl_chat> getAllChatOfUserWithUser(Long sender_id, Long receiver_id);
    public List<tbl_chat> getAllSentMessageOfUser(Long sender_id, Long receiver_id);
    public List<tbl_chat> getAllReceivedMessageOfUser(Long sender_id, Long receiver_id);
    public void inserChat(ChatInfoModel body);
}
