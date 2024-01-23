package ewallet.backend.dto;

import java.sql.Timestamp;

public record ChatSessionDto
(
    Long sender_id,
    Long receiver_id,
    String username,
    String first_name,
    String middle_name,
    String last_name,
    String message,
    Timestamp created_at
) 
{
    
}
