package ewallet.backend.dto;

public record PrincipalDto
(
    String username,
    String role,
    String firstName,
    String middleName,
    String lastName,
    byte[] profilePicture
) 
{
    
}
