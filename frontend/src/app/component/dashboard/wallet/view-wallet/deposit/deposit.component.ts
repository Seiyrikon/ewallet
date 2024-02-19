import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CancelModalComponent } from 'src/app/component/common/cancel-modal/cancel-modal.component';
import { ExpiredSessionComponent } from 'src/app/component/common/expired-session/expired-session.component';
import { LeaveModalComponent } from 'src/app/component/common/leave-modal/leave-modal.component';
import { Deposit } from 'src/app/interface/deposit';
import { Wallet } from 'src/app/interface/wallet';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DepositService } from 'src/app/service/deposit/deposit.service';
import { WalletService } from 'src/app/service/wallet/wallet.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  wallet!: Wallet;
  amount!: FormControl;
  deposit_desc!: FormControl;
  isSubmitted: boolean = false;
  isCancelled: boolean = false;
  showProgressBar: boolean = false;
  showSubmitButton: boolean = true;
  showCancelButton: boolean = true;
  session!: any;

  matcher = new MyErrorStateMatcher();

  constructor
  (
    private _depositService: DepositService,
    private _walletService: WalletService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar,
    private _authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isSessionExpired();
    this.walletId = this._route.snapshot.paramMap.get('walletId');
    this.getWalletById();
    this.initializeForm();
  }

  isSessionExpired(): any {

    const session$ = this._authService.checkSession();

    session$.subscribe
    (
      (response) => {
        if(!response)
        {
          console.error('Response is empty');
        }
        this.session = response.message;
      },
      (error) => {
        console.error('Sesssion is expired', error);
        this.openExpiredSessionDialog();
        this._router.navigate(['/login']);
      },
      () => {
        console.log("Session: ", this.session);

      }
    )
  }

  initializeForm() {
    const initialFormValues: Deposit = {
      amount: 0, // Provide initial values according to the interface
      deposit_desc: ''
    };

    this.amount = new FormControl(initialFormValues.amount, [Validators.required]);
    this.deposit_desc = new FormControl(initialFormValues.deposit_desc);

    // Create a new FormGroup based on the LoginForm interface
    this.depositForm = new FormGroup({
      amount: this.amount,
      deposit_desc: this.deposit_desc
    });
  }

  onSubmit() {
    this.errorMessage = '';
    this.isSubmitted = !this.isSubmitted;
    if(this.depositForm.valid && this.walletId)
    {
      this.showSubmitButton = false;
      this.showCancelButton = false;
      this.showProgressBar = true; // Show the progress bar
      const depositBody = this.depositForm.value;
      console.log(depositBody);

      const depositCreation$ = this._depositService.inserDeposit(+this.walletId, depositBody);

      depositCreation$.subscribe
      (
        (response) => {
          if (!response) {
            console.error('Response is empty');

          }
        },
        (error) => {
          console.error('Add wallet failed', error);
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

          this._snackbar.open('Deposit Successful', 'Close', {
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

  openExpiredSessionDialog(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this._dialog.open(ExpiredSessionComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          resolve(true); // User confirmed leaving
          this._router.navigate(['/login']);
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
