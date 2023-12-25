import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  constructor
  (
    private _authService: AuthService,
    private _router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this._authService.isTokenValid()) {
      return true; // Allow navigation if the token is valid
    } else {
      this._router.navigate(['/login']); // Redirect to login if the token is invalid or not present
      return false; // Prevent navigation
    }
  }
}
