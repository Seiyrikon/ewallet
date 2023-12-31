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
      if (component.isCancelled === true || component.isSubmitted === true)
      {
        return true;
      }
      else
      {
        if(!component.addWalletForm.touched)
        {
          return true;
        }

        if(!component.addWalletForm.dirty) {
          return true;
        }
      }
      return component.openLeaveConfirmationDialog();
    }

}
