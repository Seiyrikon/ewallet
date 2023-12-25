package ewallet.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAccountInfoModel 
{
    private Long userId;
    private String username;
    private String password;
    private String role;
    private Long piId;
    private String firstName;
    private String middleName;
    private String lastName;
}
