import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AddWalletForm } from 'src/app/interface/add-wallet-form';
import { Wallet } from 'src/app/interface/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor
    (
      private _http: HttpClient
    ) { }

  //get all the wallets of user
  getAllUserWallet(): Observable<any>
  {
    return this._http.get<Wallet[]>(`${this.baseUrl}user-wallet`)
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

  getWalletById(walletId: number): Observable<any>
  {
    return this._http.get<Wallet>(`${this.baseUrl}wallet/${walletId}`)
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

  inserWallet(addWalletForm: AddWalletForm): Observable<any>
  {
    return this._http.post<Response>(`${this.baseUrl}wallet/insert`, addWalletForm)
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

  logicalDeleteWalletById(walletId: number): Observable<any>
  {
    return this._http.put<Response>(`${this.baseUrl}wallet/delete/${walletId}`, {})
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
