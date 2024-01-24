package ewallet.backend.service;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.http.ResponseEntity;

public interface tbl_chat_historyService 
{
    public ResponseEntity<Map<String, Object>> getAllChatHistoryOfUser();
    public ResponseEntity<Map<String, Object>> getAllChatHistoryInfoOfUser();
}
