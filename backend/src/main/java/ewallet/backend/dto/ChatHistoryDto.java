package ewallet.backend.dto;

import java.sql.Timestamp;

public record ChatHistoryDto
(
    Long user_id,
    Long recipient_id,
    String username,
    String first_name,
    String middle_name,
    String last_name,
    String last_message,
    byte[] profilePicture,
    Timestamp created_at,
    Timestamp updated_at
) 
{
    
}
