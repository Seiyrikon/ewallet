package ewallet.backend.dao;

import java.sql.Timestamp;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.tbl_chat_history;

@Mapper
public interface tbl_chat_historyDao {
    public List<tbl_chat_history> getAllChatHistoryOfUser(Long user_id);
    public tbl_chat_history getChatHistoryOfUserWithRecipient(Long user_id, Long recipient_id);
    public List<tbl_chat_history> getAllChatHistoryInfoOfUser(Long user_id);
    public void insertChatHistory(Long user_id, Long recipient_id);
    public void updateChatHistory(Long user_id, Long recipient_id);

}
