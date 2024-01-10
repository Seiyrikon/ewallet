package ewallet.backend.model;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class tbl_friend_request_mst 
{
    private Long fr_id;
    private Long requestor_id;
    private Long requestee_id;
    private int accept_flag;
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
