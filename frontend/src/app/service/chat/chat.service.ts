import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ChatHistory } from 'src/app/interface/chat-history';
import { ChatSession } from 'src/app/interface/chat-session';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor
  (
    private _http: HttpClient
  ) { }

  getChatHistory(): Observable<any>
  {
    return this._http.get<ChatHistory[]>(`${this.baseUrl}chat-history`)
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

  getChatSession(recipient_id: number): Observable<any>
  {
    return this._http.get<ChatSession[]>(`${this.baseUrl}chat-session/${recipient_id}`)
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

  sendChat(receiver_id: number, message: string): Observable<any>
  {
    return this._http.post<Response>(`${this.baseUrl}chat/send/${receiver_id}`, {message})
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
