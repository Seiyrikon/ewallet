package ewallet.backend.model;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class tbl_user_friend_mst 
{
    private Long ur_id;
    private Long user_id;
    private Long friend_id;
    private int del_flag;
    private Timestamp created_at;
    private Timestamp updated_at;

    //joined data
    private Long friendId;
    private String username;
    private String role;
    private String firstName;
    private String middleName;
    private String lastName;
}
