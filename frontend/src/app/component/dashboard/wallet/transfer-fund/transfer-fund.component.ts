import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeleteModalComponent } from 'src/app/component/common/delete-modal/delete-modal.component';
import { ExpiredSessionComponent } from 'src/app/component/common/expired-session/expired-session.component';
import { Principal } from 'src/app/interface/principal';
import { Transfer } from 'src/app/interface/transfer';
import { Wallet } from 'src/app/interface/wallet';
import { AuthService } from 'src/app/service/auth/auth.service';
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
  session!: any;

  amount!: FormControl;
  note!: FormControl;

  matcher = new MyErrorStateMatcher();

  constructor
  (
    private _principalService: PrincipalService,
    private _walletService: WalletService,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isSessionExpired();
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

  onOwnClick():any {
    this.isOwnWalletClicked = !this.isOwnWalletClicked;
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
