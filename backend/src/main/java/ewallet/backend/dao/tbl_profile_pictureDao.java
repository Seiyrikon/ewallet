package ewallet.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ewallet.backend.model.tbl_profile_picture;

@Mapper
public interface tbl_profile_pictureDao {
    void insertProfilePicture(Long user_id, byte[] picture);
    List<tbl_profile_picture> getProfileRecord(Long user_id);
    void deleteProfileRecord(Long user_id);
    tbl_profile_picture getSingleProfileRecord(Long user_id);
}
