package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import ewallet.backend.dto.ChatSenderDto;
import ewallet.backend.model.tbl_chat;

@Service
public class ChatSenderDtoMapper implements Function<tbl_chat, ChatSenderDto>
{

    @Override
    public ChatSenderDto apply(tbl_chat chat) 
    {
        return new ChatSenderDto
        (
            chat.getSender_id(), 
            chat.getUsername(), 
            chat.getFirst_name(), 
            chat.getMiddle_name(), 
            chat.getLast_name(), 
            chat.getMessage(), 
            chat.getCreated_at()
        );
    }
    
}
