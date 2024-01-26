package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_profile_pictureDao;
import ewallet.backend.dto.tbl_confirm_request_mstDto;
import ewallet.backend.model.tbl_confirm_request_mst;
import ewallet.backend.model.tbl_profile_picture;

@Service
public class tbl_confirm_request_mstDtoMapper implements Function<tbl_confirm_request_mst, tbl_confirm_request_mstDto>
{
    @Autowired
    private tbl_profile_pictureDao tbl_profile_pictureDao; 

    @Override
    public tbl_confirm_request_mstDto apply(tbl_confirm_request_mst confirmRequest) {

        tbl_profile_picture userProfile = tbl_profile_pictureDao.getSingleProfileRecord(confirmRequest.getFriendId());

        if(userProfile != null)
        {
            confirmRequest.setProfilePicture(userProfile.getProfile_picture());
        }

        return new tbl_confirm_request_mstDto
        (
            confirmRequest.getFriendId(),
            confirmRequest.getUsername(), 
            confirmRequest.getRole(), 
            confirmRequest.getFirstName(),
            confirmRequest.getMiddleName(),
            confirmRequest.getLastName(),
            confirmRequest.getProfilePicture()
        );
    }
    
}
