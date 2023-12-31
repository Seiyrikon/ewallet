import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Principal } from 'src/app/interface/principal';
import { LogoutService } from 'src/app/service/logout/logout.service';
import { OverallbalanceService } from 'src/app/service/overall/overallbalance.service';
import { PrincipalService } from 'src/app/service/principal/principal.service';
import { LogoutModalComponent } from '../../common/logout-modal/logout-modal.component';

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
  errorMessage: string = '';

  constructor
  (
    private _overAllBalanceService: OverallbalanceService,
    private _principalService: PrincipalService,
    private _logoutService: LogoutService,
    private _router: Router,
    private _dialog: MatDialog
  )
  {}

  ngOnInit(): void {
    this.getPrincipalInfo();
    this.getOverAllBalancePerUser();
  }

  getOverAllBalancePerUser(): any {
    this._subscription = this._overAllBalanceService.getOverAllBalancePerUser()
    .subscribe(
      (response) => {
        if (response) {
          this.overAllBalance = response.message;
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

  openLogoutConfirmationDialog(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this._dialog.open(LogoutModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          resolve(true); // User confirmed leaving
          this._logoutService.logout();
          this._router.navigate(['/login']);
        } else {
          resolve(false); // User canceled leaving
        }
      });
    });
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }
}
