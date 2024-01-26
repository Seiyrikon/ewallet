package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_profile_pictureDao;
import ewallet.backend.dto.ChatSessionDto;
import ewallet.backend.model.tbl_chat;
import ewallet.backend.model.tbl_profile_picture;

@Service
public class ChatSessionDtoMapper implements Function<tbl_chat, ChatSessionDto>
{

    @Autowired
    private tbl_profile_pictureDao tbl_profile_pictureDao; 
    
    @Override
    public ChatSessionDto apply(tbl_chat chat) 
    {
        tbl_profile_picture userProfile = tbl_profile_pictureDao.getSingleProfileRecord(chat.getSender_id());

        if(userProfile != null)
        {
            chat.setProfilePicture(userProfile.getProfile_picture());
        }

        return new ChatSessionDto
        (
            chat.getSender_id(), 
            chat.getReceiver_id(),
            chat.getUsername(), 
            chat.getFirst_name(), 
            chat.getMiddle_name(), 
            chat.getLast_name(), 
            chat.getProfilePicture(),
            chat.getMessage(), 
            chat.getCreated_at()
        );
    }
    
}
