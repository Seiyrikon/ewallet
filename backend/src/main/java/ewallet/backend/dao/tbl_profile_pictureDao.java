package ewallet.backend.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.multipart.MultipartFile;

@Mapper
public interface tbl_profile_pictureDao {
    void insertProfilePicture(Long user_id, byte[] picture);
}
