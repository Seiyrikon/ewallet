package ewallet.backend.controller;
 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.web.bind.annotation.GetMapping;
 
@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class InitialController 
{
    @GetMapping("initial")
    public String getInitialMessage() 
    {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.selenium.dev/selenium/web/web-form.html");

        return "You are alive";
    }

    
    
}
