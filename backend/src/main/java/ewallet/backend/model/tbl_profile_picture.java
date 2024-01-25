package ewallet.backend.model;

import java.sql.Timestamp;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class tbl_profile_picture {
    private Long pp_id;
    private Long user_id;
    private byte[] profile_picture;
    private int del_flag;
    private Timestamp created_at;
    private Timestamp updated_at;
}
