import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Transaction } from 'src/app/interface/transaction';
import { AuthService } from 'src/app/service/auth/auth.service';
import { TransactionService } from 'src/app/service/transaction/transaction.service';
import { ExpiredSessionComponent } from '../../common/expired-session/expired-session.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit, OnDestroy
{
  private _subscription!: Subscription;
  transactions!: Transaction[];
  errorMessage: string = '';
  showProgressBar: boolean = false;
  session!: any;

  constructor
  (
    private _transactionService: TransactionService,
    private _dialog: MatDialog,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.isSessionExpired();
    this.getAllTransactionPerUser();
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
      },
      (error) => {
        console.error('Sesssion is expired', error);
        this.openExpiredSessionDialog();
        this._router.navigate(['/login']);
      },
      () => {
        console.log("Session: ", this.session);

      }
    )
  }

  getAllTransactionPerUser(): any
  {
    this.showProgressBar = true;

    const transactions$ = this._transactionService.getAllTransactionPerUser();

    transactions$.subscribe
    (
      (response) => {
        if(!response)
        {
          console.error('Response is empty');
        }
        this.transactions = response.message;
      },
      (error) => {
        console.error('Transactions not found', error);
        this.errorMessage = error;
        this.showProgressBar = false;
      },
      () => {
        this.showProgressBar = false
      }
    )
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
