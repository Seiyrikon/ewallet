import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileComponent } from 'src/app/component/dashboard/profile/profile.component';

@Injectable({
  providedIn: 'root'
})
export class EditProfileFormGuard implements CanDeactivate<ProfileComponent> {
  canDeactivate(
    component: ProfileComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
      if (component.isCancelled === true || component.isSubmitted === true || component.isEditFormVisible === false)
      {
        return true;
      }
      else
      {
        if(!component.editProfile.touched)
        {
          return true;
        }

        if(!component.editProfile.dirty) {
          return true;
        }
      }
      return component.openLeaveConfirmationDialog();
    }

}
