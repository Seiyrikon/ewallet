package ewallet.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterModel 
{
    private String username;
    private String password;
    private String firstName;
    private String middleName;
    private String lastName;
}
