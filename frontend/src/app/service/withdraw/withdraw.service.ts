import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Withdraw } from 'src/app/interface/withdraw';

@Injectable({
  providedIn: 'root'
})
export class WithdrawService {
  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor
  (
    private _http: HttpClient
  ) { }

  inserWithdraw(walletId: number, withdrawForm: Withdraw): Observable<any>
  {
    return this._http.post<Response>(`${this.baseUrl}withdraw/insert/${walletId}`, withdrawForm)
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
