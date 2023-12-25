package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import ewallet.backend.dto.tbl_withdrawDto;
import ewallet.backend.model.tbl_withdraw;

@Service
public class tbl_withdrawDtoMapper implements Function<tbl_withdraw, tbl_withdrawDto> 
{

    @Override
    public tbl_withdrawDto apply(tbl_withdraw withdraw) 
    {
        return new tbl_withdrawDto
        (
            withdraw.getAmount(), 
            withdraw.getWithdraw_desc()
        );
    }
    
}
