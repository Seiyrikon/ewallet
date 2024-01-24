package ewallet.backend.dto.mapper;

import java.util.List;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ewallet.backend.dto.ChatHistoryDto;
import ewallet.backend.dto.ChatSessionDto;
import ewallet.backend.model.tbl_chat_history;
import ewallet.backend.service.ChatFeatureService;

@Service
public class ChatHistoryDtoMapper implements Function<tbl_chat_history, ChatHistoryDto>
{
    @Override
    public ChatHistoryDto apply(tbl_chat_history history) {

        return new ChatHistoryDto
        (
        history.getUser_id(), 
        history.getRecipient_id(), 
        history.getUsername(), 
        history.getFirst_name(), 
        history.getMiddle_name(), 
        history.getLast_name(), 
        history.getLast_message(), 
        history.getCreated_at()
        );
    }
    
}
