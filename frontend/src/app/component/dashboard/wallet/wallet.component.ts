import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Wallet } from 'src/app/interface/wallet';
import { WalletService } from 'src/app/service/wallet/wallet.service';

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

  constructor
  (
    private _walletService: WalletService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getAllUserWallet();
  }

  getAllUserWallet(): any
  {
    this._subscription = this._walletService.getAllUserWallet()
    .subscribe(
      (response) => {
        if (response) {
          this.wallets = response.message;
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
  }

  onView(walletId: number): any {
    console.log(walletId);
    this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet', 'view', `${walletId}`] } }]);
  }

  onDelete(walletId: number): any {
    console.log(walletId);
    if(walletId)
    {
      this._subscription = this._walletService.logicalDeleteWalletById(walletId)
      .subscribe(
        (response) => {
          if (response) {
            const result = response.message; // Assuming the token is in the 'message' property
            this.getAllUserWallet();
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

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }

}
