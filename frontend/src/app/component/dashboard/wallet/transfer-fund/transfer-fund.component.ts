import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeleteModalComponent } from 'src/app/component/common/delete-modal/delete-modal.component';
import { Principal } from 'src/app/interface/principal';
import { Transfer } from 'src/app/interface/transfer';
import { Wallet } from 'src/app/interface/wallet';
import { PrincipalService } from 'src/app/service/principal/principal.service';
import { WalletService } from 'src/app/service/wallet/wallet.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.css']
})
export class TransferFundComponent implements OnInit, OnDestroy
{

  private _subscription!: Subscription;
  wallets!: Wallet[];
  principal!: Principal;
  ownWalletForm!: FormGroup;
  errorMessage: string = '';
  showProgressBar: boolean = false;
  isOwnWalletClicked: boolean = false;
  showSubmitButton: boolean = true;
  transferFromId: number = 0;
  transferToId: number = 0;
  isSubmitted: boolean = false;

  amount!: FormControl;
  note!: FormControl;

  matcher = new MyErrorStateMatcher();

  constructor
  (
    private _principalService: PrincipalService,
    private _walletService: WalletService,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPrincipalInfo();
  }

  getPrincipalInfo(): any {
    this.showProgressBar = true;

    const principal$ = this._principalService.getPrincipalInfo();

    principal$.subscribe
    (
      (response) => {
        if(!response)
        {
          console.error('Response is empty');
        }
        this.principal = response.message[0];
      },
      (error) => {
        console.error('Principal Info not found', error);
        this.errorMessage = error;
        this.showProgressBar = false;
      },
      () => {
        this.showProgressBar = false;
        console.log(this.principal);

      }
    )
  }

  initializeOwnWalletForm() {
    const initialFormValues: Transfer = {
      amount: 0, // Provide initial values according to the interface
      note: ''
    };

    this.amount = new FormControl(initialFormValues.amount, [Validators.required]);
    this.note = new FormControl(initialFormValues.note);

    // Create a new FormGroup based on the LoginForm interface
    this.ownWalletForm = new FormGroup({
      amount: this.amount,
      note: this.note
    });
  }

  getAllUserWallet(): any
  {
    this.showProgressBar = true;

    const wallets$ = this._walletService.getAllUserWallet()

    wallets$.subscribe
    (
      (response) => {
        if (!response)
        {
          console.error('Response is empty');
        }
        this.wallets = response.message;
      },
      (error) => {
        console.error('Get Wallet Failed', error);
        this.errorMessage = error;
        this.showProgressBar = false;
      },
      () => {
        this.showProgressBar = false;
      }
    )
  }

  onOwnClick():any {
    this.isOwnWalletClicked = !this.isOwnWalletClicked;
    this.getAllUserWallet();
    this.initializeOwnWalletForm();
    this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet', 'transfer', {outlets: { transferFundOutlet: ['own']}}] } }]);
    // this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['transfer', 'own'] } }]);
  }

  onFriendWalletClick():any {
    this.isOwnWalletClicked = false;
    this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet', 'transfer', {outlets: { transferFundOutlet: ['friend']}}] } }]);
  }

  onOtherClick():any {
    this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet', 'transfer', {outlets: { transferFundOutlet: ['other']}}] } }]);
    this.isOwnWalletClicked = false;
  }

  onFromSelect(walletId: number)
  {
    this.transferFromId = 0;
    this.transferFromId = walletId;
    console.log(walletId);

  }
  onToSelect(walletId: number)
  {
    this.transferToId = 0;
    this.transferToId = walletId;
    console.log(walletId);
  }

  onDeselectFrom()
  {
    this.transferFromId = 0;
  }
  onDeselectTo()
  {
    this.transferToId = 0;
  }

  onOwnWalletSubmit(): any
  {
    console.log("Form is submitted");
    this.errorMessage = '';
    this.isSubmitted = !this.isSubmitted;
    if(this.ownWalletForm.valid)
    {
      this.showSubmitButton = false;
      this.showProgressBar = true; // Show the progress bar
      const ownWalletBody = this.ownWalletForm.value;
      console.log(ownWalletBody);

      const ownWalletTransfer$ = this._walletService.transferToOwn(ownWalletBody, +this.transferFromId, +this.transferToId);

      ownWalletTransfer$.subscribe
      (
        (response) => {
          if (!response) {
            console.error('Response is empty');

          }
        },
        (error) => {
          console.error('Transfer failed', error);
          this.isSubmitted = !this.isSubmitted;
          this.showProgressBar = false;
          this.showSubmitButton = true;
          this.errorMessage = error;
        },
        () => {
          // Upon completion of wallet creation (when the observable completes)
          this.showProgressBar = false; // Hide the progress bar
          this.showSubmitButton = true; // Show the "Add Wallet" button

          this._snackbar.open('Transfer Successful', 'Close', {
            duration: 1000,
          }).afterDismissed().subscribe(() => {
            this.isOwnWalletClicked = false;
            this.transferFromId = 0;
            this.transferToId = 0;
            this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet', 'transfer'] } }]);
          })
        }
      );
    }
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }

}
