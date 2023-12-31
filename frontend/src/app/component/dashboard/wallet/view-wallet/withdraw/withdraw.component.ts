import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Wallet } from 'src/app/interface/wallet';
import { Withdraw } from 'src/app/interface/withdraw';
import { WalletService } from 'src/app/service/wallet/wallet.service';
import { WithdrawService } from 'src/app/service/withdraw/withdraw.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit, OnDestroy
{
  private _subscription!: Subscription
  withdrawForm!: FormGroup;
  errorMessage: string = '';
  walletId!: any;
  walletBalance!: number;
  wallet!: Wallet;

  constructor
  (
    private _withdrawService: WithdrawService,
    private _walletService: WalletService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.walletId = this._route.snapshot.paramMap.get('walletId');
    this.getWalletById();
    this.initializeForm();
  }

  initializeForm() {
    const initialFormValues: Withdraw = {
      amount: 0, // Provide initial values according to the interface
      withdraw_desc: ''
    };

    // Create a new FormGroup based on the LoginForm interface
    this.withdrawForm = new FormGroup({
      amount: new FormControl(initialFormValues.amount, [Validators.required]),
      withdraw_desc: new FormControl(initialFormValues.withdraw_desc, [Validators.required])
    });
  }

  onSubmit() {
    if(this.withdrawForm.valid && this.walletId)
    {
      const withdrawBody = this.withdrawForm.value;
      console.log(withdrawBody);

      this._subscription = this._withdrawService.inserWithdraw(+this.walletId, withdrawBody)
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

  onCancel(): any
  {
    this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet', 'view', `${this.walletId}`] } }]);
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }

}
