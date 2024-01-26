import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeleteModalComponent } from 'src/app/component/common/delete-modal/delete-modal.component';
import { Principal } from 'src/app/interface/principal';
import { Wallet } from 'src/app/interface/wallet';
import { PrincipalService } from 'src/app/service/principal/principal.service';
import { WalletService } from 'src/app/service/wallet/wallet.service';

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
  isOwnWalletFormVisible: boolean = false;

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
    this.isOwnWalletFormVisible = !this.isOwnWalletFormVisible;
    this.getAllUserWallet();
  }

  onFriendWalletClick():any {
    this.isOwnWalletFormVisible = false;
  }

  onOtherClick():any {
    this.isOwnWalletFormVisible = false;
  }

  onOwnWalletSubmit(): any
  {

  }

  onView(walletId: number): any {
    console.log(walletId);
    this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet', 'view', `${walletId}`] } }]);
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }

}
