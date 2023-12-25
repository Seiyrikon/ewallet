package ewallet.backend.model;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class tbl_wallet_mst 
{
    private Long wallet_id;
    private Long user_id;
    private String wallet_name;
    private String wallet_desc;
    private int del_flag;
    private Timestamp created_at;
    private Timestamp updated_at;
}
