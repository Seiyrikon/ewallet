package ewallet.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferModel {
    private Long ownerId;
    private Long transferFromWalletId;
    private Long transferToWalletId;
    private Double amount;
    private String note;
}
