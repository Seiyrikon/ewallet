package ewallet.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatInfoModel 
{
    private Long sender_id;
    private Long receiver_id;
    private String message;
}
