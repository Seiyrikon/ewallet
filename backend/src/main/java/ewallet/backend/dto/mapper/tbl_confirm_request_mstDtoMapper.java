package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import ewallet.backend.dto.tbl_confirm_request_mstDto;
import ewallet.backend.model.tbl_confirm_request_mst;

@Service
public class tbl_confirm_request_mstDtoMapper implements Function<tbl_confirm_request_mst, tbl_confirm_request_mstDto>
{

    @Override
    public tbl_confirm_request_mstDto apply(tbl_confirm_request_mst confirmRequest) {
        return new tbl_confirm_request_mstDto
        (
            confirmRequest.getFriendId(),
            confirmRequest.getUsername(), 
            confirmRequest.getRole(), 
            confirmRequest.getFirstName(),
            confirmRequest.getMiddleName(),
            confirmRequest.getLastName()
        );
    }
    
}
