package ewallet.backend.model;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class tbl_chat 
{
    private Long c_id;
    private Long sender_id;
    private Long reciever_id;
    private String message;
    private int del_flag;
    private Timestamp created_at;
    private Timestamp updated_at;

    //joined table
    private String username;
    private String first_name;
    private String middle_name;
    private String last_name;
}
