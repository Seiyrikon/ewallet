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
      if (component.isCancelled === true || component.isSubmitted === true)
      {
        return true;
      }

      if(!component.depositForm.touched)
      {
        return true;
      }

      if(!component.depositForm.dirty) {
        return true;
      }

      return component.openLeaveConfirmationDialog();
    }
}
