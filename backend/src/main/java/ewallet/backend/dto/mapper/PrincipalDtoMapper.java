package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_profile_pictureDao;
import ewallet.backend.dto.PrincipalDto;
import ewallet.backend.model.PrincipalModel;
import ewallet.backend.model.tbl_profile_picture;

@Service
public class PrincipalDtoMapper implements Function<PrincipalModel, PrincipalDto>
{
    @Autowired
    private tbl_profile_pictureDao tbl_profile_pictureDao; 

    @Override
    public PrincipalDto apply(PrincipalModel principal) 
    {
        tbl_profile_picture userProfile = tbl_profile_pictureDao.getSingleProfileRecord(principal.getUserId());

        if(userProfile != null)
        {
            principal.setProfilePicture(userProfile.getProfile_picture());
        }

        return new PrincipalDto
        (
        principal.getUsername(), 
        principal.getRole(),
        principal.getFirstName(),
        principal.getMiddleName(),
        principal.getLastName(),
        principal.getProfilePicture()
        );
    }
    
}
