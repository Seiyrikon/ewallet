package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.service.JwtService;
import ewallet.backend.service.PrincipalService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class PrincipalRestController 
{

    @Autowired
    private PrincipalService principalService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("principal")
    public ResponseEntity<Map<String, Object>> getPrincipalInfo() 
    {
        return principalService.getPrincipalInfo();
    }

    @GetMapping("get-token")
    public ResponseEntity<Map<String, Object>> getToken(HttpServletRequest request) {
        return jwtService.getToken(request);
    }
    
}
