import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DepositComponent } from 'src/app/component/dashboard/wallet/view-wallet/deposit/deposit.component';

@Injectable({
  providedIn: 'root'
})
export class AddDepositFormGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: DepositComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
      if (component.depositForm.dirty) {
        return component.openLeaveConfirmationDialog();
      }
      return true;
    }

}
