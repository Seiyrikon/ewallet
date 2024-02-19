import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private baseUrl = 'http://localhost:8080/api/v1/';
  private tokenKey = 'token';
  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
  ) { }

  logout1(): void
  {
    localStorage.removeItem(this.tokenKey);
  }



  //login
  logout(): Observable<any>
  {
    return this._http.post<Response>(`${this.baseUrl}logout`, {})
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
