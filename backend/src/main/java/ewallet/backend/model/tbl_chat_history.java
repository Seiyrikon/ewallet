package ewallet.backend.model;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class tbl_chat_history 
{
    private Long ch_id;
    private Long user_id;
    private Long recipient_id;
    private int del_flag;
    private Timestamp created_at;
    private Timestamp updated_at;

    //joined data
    private String username;
    private String first_name;
    private String middle_name;
    private String last_name;
    private String last_message;
}
