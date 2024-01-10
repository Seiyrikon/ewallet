package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import ewallet.backend.dto.tbl_user_friend_mstDto;
import ewallet.backend.model.tbl_user_friend_mst;

@Service
public class tbl_user_friend_mstDtoMapper implements Function<tbl_user_friend_mst, tbl_user_friend_mstDto>
{

    @Override
    public tbl_user_friend_mstDto apply(tbl_user_friend_mst friend) 
    {
        return new tbl_user_friend_mstDto(
            friend.getFriendId(),
            friend.getUsername(), 
            friend.getRole(), 
            friend.getFirstName(),
            friend.getMiddleName(),
            friend.getLastName()
        );
    }
    
}
