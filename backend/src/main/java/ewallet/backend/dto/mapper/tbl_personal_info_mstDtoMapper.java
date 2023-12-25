package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import ewallet.backend.dto.tbl_personal_info_mstDto;
import ewallet.backend.model.tbl_personal_info_mst;

@Service
public class tbl_personal_info_mstDtoMapper implements Function<tbl_personal_info_mst, tbl_personal_info_mstDto>
{

    @Override
    public tbl_personal_info_mstDto apply(tbl_personal_info_mst personalInfo) 
    {
        return new tbl_personal_info_mstDto
        (
            personalInfo.getFirstName(), 
            personalInfo.getMiddleName(), 
            personalInfo.getLastName()
        );
    }
    
}
