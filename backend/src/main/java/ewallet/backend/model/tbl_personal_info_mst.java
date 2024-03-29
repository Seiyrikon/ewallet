package ewallet.backend.model;

import java.io.InputStream;
import java.sql.Timestamp;
import java.awt.image.BufferedImage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class tbl_personal_info_mst 
{
    private Long piId;
    private Long userId;
    private String firstName;
    private String middleName = "";
    private String lastName = "";
    private int del_flag;
    private Timestamp created_at;
    private Timestamp updated_at;

}
