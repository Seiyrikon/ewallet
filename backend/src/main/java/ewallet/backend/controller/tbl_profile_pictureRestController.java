package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ewallet.backend.service.tbl_profile_pictureService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class tbl_profile_pictureRestController {
    
    @Autowired
    private tbl_profile_pictureService tbl_profile_pictureService;

    @PostMapping("profile/upload")
    public ResponseEntity<Map<String, Object>> uploadProfilePicture(@RequestParam("profilePicture") MultipartFile proFile_picture)
    {
        return tbl_profile_pictureService.insertProfilePicture(proFile_picture);
    }

    @GetMapping("profile/profile-pictures")
    public ResponseEntity<Map<String, Object>> getProfileRecord()
    {
        return tbl_profile_pictureService.getAllProfileRecord();
    }

}
