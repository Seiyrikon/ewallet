package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_profile_pictureDao;
import ewallet.backend.dto.tbl_friend_request_mstDto;
import ewallet.backend.model.tbl_friend_request_mst;
import ewallet.backend.model.tbl_profile_picture;

@Service
public class tbl_friend_request_mstDtoMapper implements Function<tbl_friend_request_mst, tbl_friend_request_mstDto>
{

    @Autowired
    private tbl_profile_pictureDao tbl_profile_pictureDao; 

    @Override
    public tbl_friend_request_mstDto apply(tbl_friend_request_mst friendRequest) 
    {
        tbl_profile_picture userProfile = tbl_profile_pictureDao.getSingleProfileRecord(friendRequest.getRequestor_id());

        if(userProfile != null)
        {
            friendRequest.setProfilePicture(userProfile.getProfile_picture());
        }

        return new tbl_friend_request_mstDto
        (
            friendRequest.getFriendId(),
            friendRequest.getUsername(), 
            friendRequest.getRole(), 
            friendRequest.getFirstName(),
            friendRequest.getMiddleName(),
            friendRequest.getLastName(),
            friendRequest.getProfilePicture()
        );
    }
    
}
