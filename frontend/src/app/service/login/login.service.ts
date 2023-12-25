import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginForm } from '../../interface/login-form';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(
    private _http: HttpClient
  ) { }

  //login
  authenticate(loginForm: LoginForm): Observable<any>
  {
    return this._http.post<Response>(`${this.baseUrl}authenticate`, loginForm)
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
