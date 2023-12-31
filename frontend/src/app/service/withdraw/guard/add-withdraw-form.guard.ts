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
      if (component.withdrawForm.dirty) {
        return component.openLeaveConfirmationDialog();
      }
      return true;
    }

}
