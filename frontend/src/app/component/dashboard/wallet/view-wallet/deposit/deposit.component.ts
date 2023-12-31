import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CancelModalComponent } from 'src/app/component/common/cancel-modal/cancel-modal.component';
import { LeaveModalComponent } from 'src/app/component/common/leave-modal/leave-modal.component';
import { Deposit } from 'src/app/interface/deposit';
import { Wallet } from 'src/app/interface/wallet';
import { DepositService } from 'src/app/service/deposit/deposit.service';
import { WalletService } from 'src/app/service/wallet/wallet.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit, OnDestroy
{
  private _subscription!: Subscription
  depositForm!: FormGroup;
  errorMessage: string = '';
  walletId!: any;
  walletBalance!: number;
  wallet!: Wallet

  constructor
  (
    private _depositService: DepositService,
    private _walletService: WalletService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.walletId = this._route.snapshot.paramMap.get('walletId');
    this.getWalletById();
    this.initializeForm();
  }

  initializeForm() {
    const initialFormValues: Deposit = {
      amount: 0, // Provide initial values according to the interface
      deposit_desc: ''
    };

    // Create a new FormGroup based on the LoginForm interface
    this.depositForm = new FormGroup({
      amount: new FormControl(initialFormValues.amount, [Validators.required]),
      deposit_desc: new FormControl(initialFormValues.deposit_desc, [Validators.required])
    });
  }

  onSubmit() {
    if(this.depositForm.valid && this.walletId)
    {
      const depositBody = this.depositForm.value;
      console.log(depositBody);

      this._subscription = this._depositService.inserDeposit(+this.walletId, depositBody)
      .subscribe(
        (response) => {
          if (response) {
            const result = response.message; // Assuming the token is in the 'message' property
            this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet', 'view', `${this.walletId}`] } }]);
            console.log(result);
          }
          else
          {
            console.error('Response is empty');
          }
        },
        (error) => {
          console.error('Add wallet failed', error);
          this.errorMessage = error;
        }
      )
    }
  }

  getWalletById(): any {
    if (this.walletId) {
      this._subscription = this._walletService.getWalletById(+this.walletId)
        .subscribe(
          (response) => {
            if (response) {
              this.wallet = response.message[0];
            }
            else
            {
              console.error('Response is empty');
            }
          },
          (error) => {
            console.error("An Error Occured", error);
            this.errorMessage = error;
          }
        )
    } else {
      console.error("No wallet ID found in the route");
    }
  }

  openCancelConfirmationDialog(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this._dialog.open(CancelModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          resolve(true); // User confirmed leaving
          this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet', 'view', `${this.walletId}`] } }]);
        } else {
          resolve(false); // User canceled leaving
        }
      });
    });
  }

  openLeaveConfirmationDialog(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this._dialog.open(LeaveModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          resolve(true); // User confirmed leaving
        } else {
          resolve(false); // User canceled leaving
        }
      });
    });
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }

}
