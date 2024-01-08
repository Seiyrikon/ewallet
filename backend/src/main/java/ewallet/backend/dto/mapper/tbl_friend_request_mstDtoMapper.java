package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import ewallet.backend.dto.tbl_friend_request_mstDto;
import ewallet.backend.model.tbl_friend_request_mst;

@Service
public class tbl_friend_request_mstDtoMapper implements Function<tbl_friend_request_mst, tbl_friend_request_mstDto>
{

    @Override
    public tbl_friend_request_mstDto apply(tbl_friend_request_mst friendRequest) 
    {
        return new tbl_friend_request_mstDto
        (
            friendRequest.getFriendId(),
            friendRequest.getUsername(), 
            friendRequest.getFirstName(),
            friendRequest.getMiddleName(),
            friendRequest.getLastName()
        );
    }
    
}
