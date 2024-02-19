import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Wallet } from 'src/app/interface/wallet';
import { WalletService } from 'src/app/service/wallet/wallet.service';
import { DeleteModalComponent } from '../../common/delete-modal/delete-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpiredSessionComponent } from '../../common/expired-session/expired-session.component';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit, OnDestroy
{
  private _subscription!: Subscription;
  wallets!: Wallet[];
  wallet!: Wallet;
  errorMessage: string = '';
  showProgressBar: boolean = false;
  session!: any;

  constructor
  (
    private _walletService: WalletService,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isSessionExpired();
    this.getAllUserWallet();
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

  onView(walletId: number): any {
    console.log(walletId);
    this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet', 'view', `${walletId}`] } }]);
  }

  onDelete(walletId: number): any {
    console.log(walletId);
    if(walletId)
    {
      const walletDeletion$ = this._walletService.logicalDeleteWalletById(walletId);

      walletDeletion$.subscribe
      (
        (response) => {
          if(!response)
          {
            console.error('Response is empty');

          }
        },
        (error) => {
          console.error('Delete wallet failed', error);
        },
        () => {
          this.showProgressBar = false;

          this._snackbar.open('Wallet deleted successfully!', 'Close', {
            duration: 1000,
          }).afterDismissed().subscribe(() => {
            this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet'] } }]);
            this.getAllUserWallet();
          });
        }
      )
    }
  }

  openDeleteConfirmationDialog(walletId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this._dialog.open(DeleteModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          resolve(true); // User confirmed leaving

        if(walletId)
        {
          const walletDeletion$ = this._walletService.logicalDeleteWalletById(walletId);

          walletDeletion$.subscribe
          (
            (response) => {
              if(!response)
              {
                console.error('Response is empty');

              }
            },
            (error) => {
              console.error('Delete wallet failed', error);
            },
            () => {
              this.showProgressBar = false;

              this._snackbar.open('Wallet deleted successfully!', 'Close', {
                duration: 1000,
              }).afterDismissed().subscribe(() => {
                this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet'] } }]);
                this.getAllUserWallet();
              });
            }
          )
        }
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
