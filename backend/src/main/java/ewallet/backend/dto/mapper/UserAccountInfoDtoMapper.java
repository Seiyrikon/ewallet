package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import ewallet.backend.dto.UserAccountInfoDto;
import ewallet.backend.model.UserAccountInfoModel;

@Service
public class UserAccountInfoDtoMapper implements Function<UserAccountInfoModel, UserAccountInfoDto>
{

    @Override
    public UserAccountInfoDto apply(UserAccountInfoModel user) 
    {
        return new UserAccountInfoDto
        (
            user.getUsername(), 
            user.getRole(),
            user.getFirstName(),
            user.getMiddleName(),
            user.getLastName()
        );
    }
    
}
