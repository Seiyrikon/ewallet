import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddWalletComponent } from 'src/app/component/dashboard/wallet/add-wallet/add-wallet.component';

@Injectable({
  providedIn: 'root'
})
export class AddWalletFormGuard implements CanDeactivate<AddWalletComponent> {

  canDeactivate(
    component: AddWalletComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
      if (component.wallet_name.touched && component.wallet_desc.touched) {
        if (component.wallet_desc.value !== null && component.wallet_desc.value !== '') {
          // Wallet description is not empty, return true
          return true;
        } else {
          // Show confirmation dialog only if wallet description is empty
          return component.openLeaveConfirmationDialog();
        }
      }


      return true;
    }

}
