import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Friend } from 'src/app/interface/friend';
import { User } from 'src/app/interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor
  (
    private _http: HttpClient
  ) { }

  //get the currently logged in user
  searchUserByUsername(username: string): Observable<any>
  {
    return this._http.get<User[]>(`${this.baseUrl}user/search/${username}`)
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
  getAllUserInfo(): Observable<any>
  {
    return this._http.get<User[]>(`${this.baseUrl}all-user-account-info`)
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

  getAllInfoOfUser(user_id: number): Observable<any>
  {
    return this._http.get<User>(`${this.baseUrl}user-account-info/${user_id}`)
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
