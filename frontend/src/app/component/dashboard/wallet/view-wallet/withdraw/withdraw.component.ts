import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CancelModalComponent } from 'src/app/component/common/cancel-modal/cancel-modal.component';
import { LeaveModalComponent } from 'src/app/component/common/leave-modal/leave-modal.component';
import { Wallet } from 'src/app/interface/wallet';
import { Withdraw } from 'src/app/interface/withdraw';
import { WalletService } from 'src/app/service/wallet/wallet.service';
import { WithdrawService } from 'src/app/service/withdraw/withdraw.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  amount!: FormControl;
  withdraw_desc!: FormControl;

  matcher = new MyErrorStateMatcher();
  isSubmitted: boolean = false;
  isCancelled: boolean = false;
  showProgressBar: boolean = false;
  showSubmitButton: boolean = true;
  showCancelButton: boolean = true;

  constructor
  (
    private _withdrawService: WithdrawService,
    private _walletService: WalletService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar,
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

    this.amount = new FormControl(initialFormValues.amount, [Validators.required]);
    this.withdraw_desc = new FormControl(initialFormValues.withdraw_desc);

    // Create a new FormGroup based on the LoginForm interface
    this.withdrawForm = new FormGroup({
      amount: this.amount,
      withdraw_desc: this.withdraw_desc
    });
  }

  onSubmit() {
    this.errorMessage = '';
    this.isSubmitted = !this.isSubmitted;
    if(this.withdrawForm.valid && this.walletId)
    {
      this.showSubmitButton = false;
      this.showCancelButton = false;
      this.showProgressBar = true; // Show the progress bar
      const withdrawBody = this.withdrawForm.value;
      console.log(withdrawBody);

      const withdrawCreation$ = this._withdrawService.inserWithdraw(+this.walletId, withdrawBody);

      withdrawCreation$.subscribe
      (
        (response) => {
          if(!response)
          {
            console.error('Response is empty');

          }
        },
        (error) => {
          this.isSubmitted = !this.isSubmitted;

          this.showProgressBar = false;
          this.showSubmitButton = true;
          this.showCancelButton = true; // Show the "Cancel" button
          this.errorMessage = error;
        },
        () => {
          // Upon completion of wallet creation (when the observable completes)
          this.showProgressBar = false; // Hide the progress bar
          this.showSubmitButton = true; // Show the "Add Wallet" button
          this.showCancelButton = true; // Show the "Cancel" button

          this._snackbar.open('Withdraw Successful', 'Close', {
            duration: 1000,
          }).afterDismissed().subscribe(() => {
            this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet', 'view', `${this.walletId}`] } }]);
          })
        }
      );
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

  //modal for cancel button
  openCancelConfirmationDialog(): Promise<boolean> {
    this.isCancelled = !this.isCancelled;
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this._dialog.open(CancelModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          resolve(true); // User confirmed leaving
          this.errorMessage = '';
          this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet', 'view', `${this.walletId}`] } }]);
        } else {
          resolve(false); // User canceled leaving
        }
      });
    });
  }

  //guard for leaving a route if form has unsaved value
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
