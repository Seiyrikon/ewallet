import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Transaction } from 'src/app/interface/transaction';
import { TransactionService } from 'src/app/service/transaction/transaction.service';

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

  constructor
  (
    private _transactionService: TransactionService,
  ) {}

  ngOnInit(): void {
    this.getAllTransactionPerUser();
  }

  getAllTransactionPerUser(): any
  {
    this._subscription = this._transactionService.getAllTransactionPerUser()
    .subscribe(
      (response) => {
        if (response) {
          this.transactions = response.message;
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
