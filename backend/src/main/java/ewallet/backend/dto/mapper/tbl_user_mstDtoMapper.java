package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import ewallet.backend.dto.tbl_user_mstDto;
import ewallet.backend.model.tbl_user_mst;

@Service
public class tbl_user_mstDtoMapper implements Function<tbl_user_mst, tbl_user_mstDto>
{

    @Override
    public tbl_user_mstDto apply(tbl_user_mst account) 
    {
        return new tbl_user_mstDto
        (
            account.getUsername(), 
            account.getRole()
        );
    }
}
