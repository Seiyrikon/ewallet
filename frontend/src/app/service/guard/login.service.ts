import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor
  (
    private _authService: AuthService,
    private _router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this._authService.isTokenValid()) {
      this._router.navigate(['/dashboard']); // Redirect to dashboard if a valid token exists
      return false; // Prevent navigation to the login page
    } else {
      return true; // Allow navigation to the login page if the token is not valid or doesn't exist
    }
  }
}
