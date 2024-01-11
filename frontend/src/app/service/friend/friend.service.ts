import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Friend } from 'src/app/interface/friend';
import { Principal } from 'src/app/interface/principal';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor
  (
    private _http: HttpClient
  ) { }

  //get the currently logged in user
  searchUserByUsername(username: string): Observable<any>
  {
    return this._http.get<Friend[]>(`${this.baseUrl}user/search/${username}`)
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
  getAllFriendsOfUser(): Observable<any>
  {
    return this._http.get<Friend[]>(`${this.baseUrl}user/friend/all`)
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

  addFriend(friendId: number): Observable<any>
  {
    return this._http.post<Response>(`${this.baseUrl}friend/add-friend/${friendId}`, {})
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

  acceptFriend(friendId: number): Observable<any>
  {
    return this._http.post<Response>(`${this.baseUrl}friend/accept-friend/${friendId}`, {})
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

  cancelFriendRequest(friendId: number): Observable<any>
  {
    return this._http.delete<Response>(`${this.baseUrl}friend/cancel-friend/${friendId}`, {})
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

  declineFriendRequest(friendId: number): Observable<any>
  {
    return this._http.delete<Response>(`${this.baseUrl}friend/decline-friend/${friendId}`, {})
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

  getAllFriendRequest(): Observable<any>
  {
    return this._http.get<Friend[]>(`${this.baseUrl}user/pending-request/all`)
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
  getAllConfirmRequest(): Observable<any>
  {
    return this._http.get<Friend[]>(`${this.baseUrl}user/confirm-request/all`)
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

  friendRequestChecker(friendId: number): Observable<any>
  {
    return this._http.get<Response>(`${this.baseUrl}user/frend-request-check/${friendId}`)
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
