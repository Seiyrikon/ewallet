package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_friend_request_mstDao;
import ewallet.backend.dao.tbl_user_friend_mstDao;
import ewallet.backend.dto.UserAccountInfoDto;
import ewallet.backend.model.UserAccountInfoModel;
import ewallet.backend.model.tbl_friend_request_mst;
import ewallet.backend.model.tbl_user_friend_mst;

@Service
public class UserAccountInfoDtoMapper implements Function<UserAccountInfoModel, UserAccountInfoDto>
{
    @Autowired
    private tbl_friend_request_mstDao tbl_friend_request_mstDao;

    @Autowired
    private tbl_user_friend_mstDao tbl_user_friend_mstDao;

    @Override
    public UserAccountInfoDto apply(UserAccountInfoModel user) 
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try 
        {
            if (authentication != null && authentication.isAuthenticated()) 
            {
                //gets the user_id of the currently logged in user
                Long userId = Long.parseLong(authentication.getName());

                tbl_friend_request_mst isFriendRequestSent = tbl_friend_request_mstDao.friendRequestChecker(userId, user.getUserId());
                tbl_user_friend_mst isFriend = tbl_user_friend_mstDao.friendChecker(userId, user.getUserId());
    
                if(isFriendRequestSent != null)
                {
                    user.setFriendRequestFlag(true);
                }
                else
                {
                    user.setFriendRequestFlag(false);
                }

                if(isFriend != null)
                {
                  user.setFriendFlag(true);
                }
                else 
                {
                  user.setFriendFlag(false);
                }
            }
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
        }

        return new UserAccountInfoDto
        (
            user.getUserId(),
            user.getUsername(), 
            user.getRole(),
            user.getFirstName(),
            user.getMiddleName(),
            user.getLastName(),
            user.isFriendRequestFlag(),
            user.isFriendFlag()
        );
    }
    
}
