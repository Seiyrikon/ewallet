import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Deposit } from 'src/app/interface/deposit';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor
  (
    private _http: HttpClient
  ) { }

  inserDeposit(walletId: number, depositForm: Deposit): Observable<any>
  {
    return this._http.post<Response>(`${this.baseUrl}deposit/insert/${walletId}`, depositForm)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            errorMessage = `error: ${error.error.message}`;
          }
          else {
            errorMessage = `${error.error.message}`
          }
          return throwError(errorMessage);
        })
      );
  }
}
