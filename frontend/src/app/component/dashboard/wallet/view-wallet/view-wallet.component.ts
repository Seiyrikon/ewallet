import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Wallet } from 'src/app/interface/wallet';
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

  constructor
  (
    private _walletService: WalletService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.walletId = this._route.snapshot.paramMap.get('walletId');
    this.getWalletById();
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

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }

}
