package ewallet.backend.dto;

public record tbl_friend_request_mstDto
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
