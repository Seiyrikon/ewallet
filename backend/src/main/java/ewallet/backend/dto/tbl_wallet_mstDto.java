package ewallet.backend.dto;

public record tbl_wallet_mstDto
(
    Long user_id,
    Long wallet_id,
    String wallet_name,
    String wallet_desc,
    Double balance
) 
{
    
}
