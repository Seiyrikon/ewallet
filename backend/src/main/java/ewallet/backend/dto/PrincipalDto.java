package ewallet.backend.dto;

public record PrincipalDto
(
    Long userId,
    String username,
    String role,
    String firstName,
    String middleName,
    String lastName,
    byte[] profilePicture
) 
{
    
}
