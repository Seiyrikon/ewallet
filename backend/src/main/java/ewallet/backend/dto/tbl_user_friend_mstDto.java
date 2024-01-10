package ewallet.backend.dto;

public record tbl_user_friend_mstDto
(
    Long friendId,
    String username,
    String role,
    String firstName,
    String middleName,
    String lastName
) 
{
    
}
