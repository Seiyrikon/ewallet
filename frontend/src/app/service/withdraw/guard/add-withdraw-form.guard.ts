import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WithdrawComponent } from 'src/app/component/dashboard/wallet/view-wallet/withdraw/withdraw.component';

@Injectable({
  providedIn: 'root'
})
export class AddWithdrawFormGuard implements CanDeactivate<WithdrawComponent> {

  constructor
    (
      private _router: Router,
      private _route: ActivatedRoute
    ) { }

  canDeactivate(
    component: WithdrawComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
      if (component.isCancelled === true || component.isSubmitted === true)
      {
        return true;
      }

      if(!component.withdrawForm.touched)
      {
        return true;
      }

      if(!component.withdrawForm.dirty) {
        return true;
      }

      return component.openLeaveConfirmationDialog();
    }

}
