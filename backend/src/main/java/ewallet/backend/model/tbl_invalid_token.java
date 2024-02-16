package ewallet.backend.model;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class tbl_invalid_token 
{
    private Long it_id;
    private Long user_id;
    private String invalid_token;
    private Timestamp created_at;
    private Timestamp updated_at;
}
