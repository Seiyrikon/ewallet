package ewallet.backend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import ewallet.backend.model.TransferModel;
import ewallet.backend.model.tbl_deposit;

public interface TransferFundFeatureService 
{
    public ResponseEntity<Map<String, Object>> transferFund(TransferModel body, Long transferFromId, Long transferToId);
}
