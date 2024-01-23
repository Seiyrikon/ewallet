package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import ewallet.backend.dto.ChatSessionDto;
import ewallet.backend.model.tbl_chat;

@Service
public class ChatSessionDtoMapper implements Function<tbl_chat, ChatSessionDto>
{

    @Override
    public ChatSessionDto apply(tbl_chat chat) 
    {
        return new ChatSessionDto
        (
            chat.getSender_id(), 
            chat.getReceiver_id(),
            chat.getUsername(), 
            chat.getFirst_name(), 
            chat.getMiddle_name(), 
            chat.getLast_name(), 
            chat.getMessage(), 
            chat.getCreated_at()
        );
    }
    
}
