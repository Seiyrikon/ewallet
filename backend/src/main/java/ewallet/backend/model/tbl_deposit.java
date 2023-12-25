package ewallet.backend.model;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class tbl_deposit 
{
    private Long deposit_id;
    private Long user_id;
    private Long wallet_id;
    private Double amount;
    private String deposit_desc;
    private int del_flag;
    private Timestamp created_at;
    private Timestamp updated_at;
}
