package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import ewallet.backend.dto.tbl_transactionDto;
import ewallet.backend.model.tbl_transaction;

@Service
public class tbl_transactionDtoMapper implements Function<tbl_transaction, tbl_transactionDto>
{

    @Override
    public tbl_transactionDto apply(tbl_transaction transaction) 
    {
        return new tbl_transactionDto
        (
            transaction.getTransaction_type(), 
            transaction.getTransaction_amount(), 
            transaction.getTransaction_desc()
        );
    }
    
}
