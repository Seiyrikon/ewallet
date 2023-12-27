import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Principal } from 'src/app/interface/principal';
import { LogoutService } from 'src/app/service/logout/logout.service';
import { OverallbalanceService } from 'src/app/service/overall/overallbalance.service';
import { PrincipalService } from 'src/app/service/principal/principal.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit, OnDestroy
{
  private _subscription!: Subscription;
  principal!: Principal;
  overAllBalance!: number;

  constructor
  (
    private _overAllBalanceService: OverallbalanceService,
    private _principalService: PrincipalService,
    private _logoutService: LogoutService,
    private _router: Router
  )
  {}

  ngOnInit(): void {
    this.getOverAllBalancePerUser();
    this.getPrincipalInfo();
  }

  getOverAllBalancePerUser(): any {
    this._subscription = this._overAllBalanceService.getOverAllBalancePerUser()
    .subscribe(
      (response) => {
        this.overAllBalance = response.message;
      },
      (error) => {
        console.error("An Error Occured", error);
      }
    )
  }

  getPrincipalInfo(): any {
    this._subscription = this._principalService.getPrincipalInfo()
    .subscribe(
      (response) => {
        this.principal = response.message[0];
      },
      (error) => {
        console.error("An Error Occured", error);
      }
    )
  }

  onLogout(): void {
    this._logoutService.logout(); // Call the logout method from the AuthService
    // Perform any additional actions after logout (e.g., redirecting to login page)
    this._router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }
}
