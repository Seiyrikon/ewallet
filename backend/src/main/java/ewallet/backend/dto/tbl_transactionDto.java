package ewallet.backend.dto;

import java.sql.Timestamp;

public record tbl_transactionDto
(
    String wallet_name,
    String transaction_type,
    Double transaction_amount,
    String transaction_desc,
    Timestamp created_at
) 
{
    
}
