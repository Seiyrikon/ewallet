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
  overAllBalance: number = 0.00;
  errorMessage: string = '';
  showProgressBar: boolean = false;

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
