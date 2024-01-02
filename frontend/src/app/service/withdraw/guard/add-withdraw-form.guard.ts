import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WithdrawComponent } from 'src/app/component/dashboard/wallet/view-wallet/withdraw/withdraw.component';

@Injectable({
  providedIn: 'root'
})
export class AddWithdrawFormGuard implements CanDeactivate<WithdrawComponent> {
  canDeactivate(
    component: WithdrawComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (component.amount.touched && component.withdraw_desc.touched) {
        if (component.withdraw_desc.value !== null && component.withdraw_desc.value !== '') {
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
