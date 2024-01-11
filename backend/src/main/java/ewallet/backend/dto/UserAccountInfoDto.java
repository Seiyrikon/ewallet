package ewallet.backend.dto;

public record UserAccountInfoDto
(
    Long userId,
    String username,
    String role,
    String firstName,
    String middleName,
    String lastName,
    boolean friendRequestFlag,
    boolean friendFlag
) 
{
    
}
