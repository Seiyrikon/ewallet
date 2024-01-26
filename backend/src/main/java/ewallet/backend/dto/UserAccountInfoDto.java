package ewallet.backend.dto;

import org.springframework.web.multipart.MultipartFile;

public record UserAccountInfoDto
(
    Long userId,
    String username,
    String role,
    String firstName,
    String middleName,
    String lastName,
    byte[] profilePicture,
    boolean friendRequestFlag,
    boolean friendFlag
) 
{
    
}
