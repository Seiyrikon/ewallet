package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import ewallet.backend.dto.tbl_depositDto;
import ewallet.backend.model.tbl_deposit;

@Service
public class tbl_depositDtoMapper implements Function<tbl_deposit, tbl_depositDto>
{

    @Override
    public tbl_depositDto apply(tbl_deposit deposit) 
    {
        return new tbl_depositDto
        (
            deposit.getAmount(), 
            deposit.getDeposit_desc()
        );
    }
    
}
