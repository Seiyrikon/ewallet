import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExpiredSessionComponent } from 'src/app/component/common/expired-session/expired-session.component';
import { Wallet } from 'src/app/interface/wallet';
import { AuthService } from 'src/app/service/auth/auth.service';
import { WalletService } from 'src/app/service/wallet/wallet.service';

@Component({
  selector: 'app-view-wallet',
  templateUrl: './view-wallet.component.html',
  styleUrls: ['./view-wallet.component.css']
})
export class ViewWalletComponent implements OnInit, OnDestroy
{
  private _subscription!: Subscription
  wallet!: Wallet;
  walletId!: any;
  errorMessage: string = '';
  showProgressBar: boolean = false;
  session!: any;

  constructor
  (
    private _walletService: WalletService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isSessionExpired();
    this.walletId = this._route.snapshot.paramMap.get('walletId');
    this.getWalletById();
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

  getWalletById(): any {
    if(this.walletId)
    {
      this.showProgressBar = true;
      const wallet$ = this._walletService.getWalletById(+this.walletId);

      wallet$.subscribe
      (
        (response) => {
          if(!response)
          {
            console.error('Response is empty');
          }
          this.wallet = response.message[0];
        },
        (error) => {
          console.error('An error occured', error);
          this.errorMessage = error;
          this.showProgressBar = false;
        },
        () => {
          this.showProgressBar = false;
        }
      )
    }
    else
    {
      console.error('No wallet ID found in the route');
    }
  }

  onDeposit(walletId: number): any
  {
    this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet', 'view', `${walletId}`, 'deposit'] } }]);
  }

  onWithdraw(walletId: number): any
  {
    this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet', 'view', `${walletId}`, 'withdraw'] } }]);
  }

  onBack()
  {
    this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet'] } }]);
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
