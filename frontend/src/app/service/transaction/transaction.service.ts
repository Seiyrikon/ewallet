import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/interface/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor
  (
    private _http: HttpClient
  ) { }

  //get all the wallets of user
  getAllTransactionPerUser(): Observable<any>
  {
    return this._http.get<Transaction[]>(`${this.baseUrl}all-transactions`);
  }
}
