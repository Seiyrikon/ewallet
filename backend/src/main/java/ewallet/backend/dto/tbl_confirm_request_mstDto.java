package ewallet.backend.dto;

public record tbl_confirm_request_mstDto
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
