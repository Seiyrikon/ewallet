package ewallet.backend.service.serviceimpl;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import ewallet.backend.model.ChatInfoModel;
import ewallet.backend.service.tbl_chatService;

public class tbl_chatServiceImpl implements tbl_chatService
{

    @Override
    public ResponseEntity<Map<String, Object>> getAllChatOfUserWithUser(Long receiver_id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllChatOfUserWithUser'");
    }

    @Override
    public ResponseEntity<Map<String, Object>> inserChat(ChatInfoModel body) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'inserChat'");
    }
    
}
