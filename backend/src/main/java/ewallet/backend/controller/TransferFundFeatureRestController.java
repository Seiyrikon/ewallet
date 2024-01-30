package ewallet.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ewallet.backend.model.TransferModel;
import ewallet.backend.service.TransferFundFeatureService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class TransferFundFeatureRestController 
{
    
    @Autowired
    private TransferFundFeatureService transferFundFeatureService;

    @PostMapping("transfer/own")
    public ResponseEntity<Map<String, Object>> transferToOwn(@RequestBody TransferModel body, @RequestParam Long recipientId, @RequestParam Long transferFromId, @RequestParam Long transferToId)
    {
        return transferFundFeatureService.transferFund(body, recipientId, transferFromId, transferToId);
    }

}
