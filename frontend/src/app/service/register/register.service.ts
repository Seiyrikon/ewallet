import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { RegisterForm } from 'src/app/interface/register-form';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(
    private _http: HttpClient
  ) { }

  //register
  register(registerForm: RegisterForm): Observable<any>
  {
    return this._http.post<Response>(`${this.baseUrl}register`, registerForm)
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
