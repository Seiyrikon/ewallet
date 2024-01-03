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
  showProgressBar: boolean = false;

  constructor
  (
    private _transactionService: TransactionService,
  ) {}

  ngOnInit(): void {
    this.getAllTransactionPerUser();
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
      },
      () => {
        this.showProgressBar = false
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
