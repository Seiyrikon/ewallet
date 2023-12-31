import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Principal } from 'src/app/interface/principal';
import { LogoutService } from 'src/app/service/logout/logout.service';
import { OverallbalanceService } from 'src/app/service/overall/overallbalance.service';
import { PrincipalService } from 'src/app/service/principal/principal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy
{
  private _subscription!: Subscription;
  principal!: Principal;
  errorMessage: string = '';

  constructor
  (
    private _principalService: PrincipalService,
    private _logoutService: LogoutService,
    private _router: Router
  )
  {}

  ngOnInit(): void {
    this.getPrincipalInfo();
  }

  getPrincipalInfo(): any {
    this._subscription = this._principalService.getPrincipalInfo()
    .subscribe(
      (response) => {
        if (response) {
          this.principal = response.message[0];
        }
        else
        {
          console.error('Response is empty');
        }
      },
      (error) => {
        console.error("An Error Occured", error);
        this.errorMessage = error;
      }
    )
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }

}
