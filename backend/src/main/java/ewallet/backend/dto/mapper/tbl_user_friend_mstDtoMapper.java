package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_profile_pictureDao;
import ewallet.backend.dto.tbl_user_friend_mstDto;
import ewallet.backend.model.tbl_profile_picture;
import ewallet.backend.model.tbl_user_friend_mst;

@Service
public class tbl_user_friend_mstDtoMapper implements Function<tbl_user_friend_mst, tbl_user_friend_mstDto>
{

    @Autowired
    private tbl_profile_pictureDao tbl_profile_pictureDao; 

    @Override
    public tbl_user_friend_mstDto apply(tbl_user_friend_mst friend) 
    {

        tbl_profile_picture userProfile = tbl_profile_pictureDao.getSingleProfileRecord(friend.getFriendId());

        if(userProfile != null)
        {
            friend.setProfilePicture(userProfile.getProfile_picture());
        }

        return new tbl_user_friend_mstDto(
            friend.getFriendId(),
            friend.getUsername(), 
            friend.getRole(), 
            friend.getFirstName(),
            friend.getMiddleName(),
            friend.getLastName(),
            friend.getProfilePicture()
        );
    }
    
}
