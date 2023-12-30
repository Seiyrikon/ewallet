import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverallbalanceService {
  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(
    private _http: HttpClient
  ) { }

  //over all balance of all wallet per user
  getOverAllBalancePerUser(): Observable<any>
  {
    return this._http.get<Response>(`${this.baseUrl}over-all-balance`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent)
        {
          errorMessage = `error: ${error.error.message}`;
        }
        else
        {
          errorMessage = `${error.error.message}`
        }
        return throwError(errorMessage);
      })
    );
  }
}
