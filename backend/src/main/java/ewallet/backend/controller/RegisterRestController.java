package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.model.RegisterModel;
import ewallet.backend.service.ResgisterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class RegisterRestController 
{

    @Autowired
    private ResgisterService resgisterService;

    @PostMapping("register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterModel model) 
    {
        return resgisterService.register(model);
    }
    
}
