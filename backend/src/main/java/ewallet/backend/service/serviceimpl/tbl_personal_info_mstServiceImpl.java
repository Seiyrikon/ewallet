package ewallet.backend.service.serviceimpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_personal_info_mstDao;
import ewallet.backend.dto.tbl_personal_info_mstDto;
import ewallet.backend.dto.mapper.tbl_personal_info_mstDtoMapper;
import ewallet.backend.model.tbl_personal_info_mst;
import ewallet.backend.service.tbl_personal_info_mstService;

@Service
public class tbl_personal_info_mstServiceImpl implements tbl_personal_info_mstService
{

    @Autowired
    private tbl_personal_info_mstDao TBL_PERSONAL_INFO_MSTDao;

    @Autowired
    private tbl_personal_info_mstDtoMapper TBL_PERSONAL_INFO_MSTMapper;

    List<tbl_personal_info_mstDto> personalInfo = new ArrayList<tbl_personal_info_mstDto>();
    Map<String, Object> response = new HashMap<String,Object>();

    @Override
    public ResponseEntity<Map<String, Object>> getUserPersonalInfo(Long userId) 
    {
        try 
        {
            personalInfo = TBL_PERSONAL_INFO_MSTDao.getUserPersonalInfo(userId)
            .stream()
            .map(TBL_PERSONAL_INFO_MSTMapper).collect(Collectors.toList());

            if(personalInfo.size() != 0)
            {
                response.put("message", personalInfo);
            }
            else
            {
                response.put("message", "User not found");
                return ResponseEntity.status(404).body(response);
            }
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
            response.put("message", "Internal Server Error");
            return ResponseEntity.status(500).body(response);
        }

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String, Object>> insertPersonalInfo(tbl_personal_info_mst body, Long userId) 
    {
        try 
        {
            if(body != null)
            {
                TBL_PERSONAL_INFO_MSTDao.insertPersonalInfo(body, userId);
                response.put("message", "Success");
            }
            else 
            {
                response.put("message", "Something went wrong");
                return ResponseEntity.status(401).body(response);
            }
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
            response.put("message", "Internal Server Error");
            return ResponseEntity.status(500).body(response);
        }
        
        return ResponseEntity.ok(response);
    }
    
}
