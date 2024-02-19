import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Principal } from 'src/app/interface/principal';
import { LogoutService } from 'src/app/service/logout/logout.service';
import { OverallbalanceService } from 'src/app/service/overall/overallbalance.service';
import { PrincipalService } from 'src/app/service/principal/principal.service';
import { LogoutModalComponent } from '../../common/logout-modal/logout-modal.component';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ExpiredSessionComponent } from '../../common/expired-session/expired-session.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit, OnDestroy
{
  private _subscription!: Subscription;
  principal!: Principal;
  overAllBalance: number = 0.00;
  errorMessage: string = '';
  showProgressBar: boolean = false;
  session!: any;

  constructor
  (
    private _overAllBalanceService: OverallbalanceService,
    private _principalService: PrincipalService,
    private _logoutService: LogoutService,
    private _router: Router,
    private _dialog: MatDialog,
    private _authService: AuthService
  )
  {}

  ngOnInit(): void {
    this.isSessionExpired();
    this.getPrincipalInfo();
    this.getOverAllBalancePerUser();
  }

  isSessionExpired(): any {

    const session$ = this._authService.checkSession();

    session$.subscribe
    (
      (response) => {
        if(!response)
        {
          console.error('Response is empty');
        }
        this.session = response.message;
        console.log(this.session);

      },
      (error) => {
        console.error('Sesssion is expired', error);
        this.openExpiredSessionDialog();
        this._router.navigate(['/login']);
      },
      () => {
      }
    )
  }

  getOverAllBalancePerUser(): any {
    this.showProgressBar = true;

    const overAllBalance$ = this._overAllBalanceService.getOverAllBalancePerUser();

    overAllBalance$.subscribe
    (
      (response) => {
        if(!response)
        {
          console.error('Response is empty');
        }
        this.overAllBalance = response.message;
      },
      (error) => {
        console.error('Overall Balance Missing', error);
        this.errorMessage = error;
        this.showProgressBar = false;
      },
      () => {
        this.showProgressBar = false; // Hide the progress bar
      }
    )
  }

  getPrincipalInfo(): any {
    this.showProgressBar = true;

    const principal$ = this._principalService.getPrincipalInfo();

    principal$.subscribe
    (
      (response) => {
        if(!response)
        {
          console.error('Response is empty');
        }
        this.principal = response.message[0];
      },
      (error) => {
        console.error('Principal Info not found', error);
        this.errorMessage = error;
        this.showProgressBar = false;
      },
      () => {
        this.showProgressBar = false;
      }
    )
  }

  logout(): any {

    const logout$ = this._logoutService.logout();

    logout$.subscribe
    (
      (response) => {
          console.log('Logout Success: ', response.message);
      },
      (error) => {
        console.error('Logout Failed', error);
      },
      () => {
        this._authService.invalidTokenHandler();
      }
    )
  }

  openLogoutConfirmationDialog(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this._dialog.open(LogoutModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          resolve(true); // User confirmed leaving
          this.logout();
          this._router.navigate(['/login']);
        } else {
          resolve(false); // User canceled leaving
        }
      });
    });
  }

  openExpiredSessionDialog(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this._dialog.open(ExpiredSessionComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          resolve(true); // User confirmed leaving
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
