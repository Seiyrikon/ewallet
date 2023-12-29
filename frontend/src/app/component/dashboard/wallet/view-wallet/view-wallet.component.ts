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
  wallet!: Wallet

  constructor
  (
    private _walletService: WalletService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getWalletById();
  }

  getWalletById(): any {
    const walletId = this._route.snapshot.paramMap.get('walletId')
    if (walletId) {
      this._subscription = this._walletService.getWalletById(+walletId)
        .subscribe(
          (response) => {
            this.wallet = response.message[0];
          },
          (error) => {
            console.error("An Error Occurred", error);
          }
        );
    } else {
      console.error("No wallet ID found in the route");
    }
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
