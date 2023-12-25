package ewallet.backend.dto.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import ewallet.backend.dto.PrincipalDto;
import ewallet.backend.model.PrincipalModel;

@Service
public class PrincipalDtoMapper implements Function<PrincipalModel, PrincipalDto>
{

    @Override
    public PrincipalDto apply(PrincipalModel principal) 
    {
        return new PrincipalDto
        (
        principal.getUsername(), 
        principal.getRole(),
        principal.getFirstName(),
        principal.getMiddleName(),
        principal.getLastName()
        );
    }
    
}
