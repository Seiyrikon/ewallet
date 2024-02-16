import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Principal } from 'src/app/interface/principal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/';
  private tokenKey = 'token';

  constructor
  (
    private _http: HttpClient
  ) { }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isTokenValid(): boolean {
    const token = this.getToken();

    return !!token; // Example: Return true if the token exists, modify this based on your validation logic
  }

  checkToken(): Observable<any>
  {
    return this._http.get<Response>(`${this.baseUrl}get-token`)
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
