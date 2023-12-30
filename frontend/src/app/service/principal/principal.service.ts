import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Principal } from 'src/app/interface/principal';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor
  (
    private _http: HttpClient
  ) { }

  //get the currently logged in user
  getPrincipalInfo(): Observable<any>
  {
    return this._http.get<Principal[]>(`${this.baseUrl}principal`)
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
