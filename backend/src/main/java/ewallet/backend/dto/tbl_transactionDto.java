package ewallet.backend.dto;

public record tbl_transactionDto
(
    String transaction_type,
    Double transaction_amount,
    String transaction_desc
) 
{
    
}
