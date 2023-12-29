import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor
  (
    private _walletService: WalletService
  ) { }

  ngOnInit(): void {
    this.getAllUserWallet();
  }

  getAllUserWallet(): any
  {
    this._subscription = this._walletService.getAllUserWallet()
    .subscribe(
      (response) => {
        this.wallets = response.message;
      },
      (error) => {
        console.error("An Error Occured", error);
      }
    )
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }

}
