package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface tbl_profile_pictureService {
    public ResponseEntity<Map<String, Object>> insertProfilePicture(MultipartFile profile_picture);
    public ResponseEntity<Map<String, Object>> getAllProfileRecord();
}
