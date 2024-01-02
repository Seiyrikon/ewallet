import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DepositComponent } from 'src/app/component/dashboard/wallet/view-wallet/deposit/deposit.component';

@Injectable({
  providedIn: 'root'
})
export class AddDepositFormGuard implements CanDeactivate<DepositComponent> {
  canDeactivate(
    component: DepositComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
      if (component.amount.touched && component.deposit_desc.touched) {
        if (component.deposit_desc.value !== null && component.deposit_desc.value !== '') {
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
