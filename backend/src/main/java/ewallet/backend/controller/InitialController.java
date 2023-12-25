package ewallet.backend.controller;
 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
 
@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class InitialController 
{
    @GetMapping("initial")
    public String getInitialMessage() 
    {
        return "You are alive";
    }
    
}
