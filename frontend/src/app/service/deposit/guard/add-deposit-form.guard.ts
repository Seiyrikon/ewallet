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
      if ((component.deposit_desc !== null || component.deposit_desc !== '')  && (component.depositForm.touched || component.depositForm.dirty)) {
        return component.openLeaveConfirmationDialog();
      }
      if(component.depositForm.valid)
      {
        return true
      }
      return true;
    }

}
