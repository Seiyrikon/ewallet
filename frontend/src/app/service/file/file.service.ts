import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { EditProfileForm } from 'src/app/interface/edit-profile-form';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(
    private _http: HttpClient
  ) { }

  //edit profile
  uploadFile(file: File): Observable<any>
  {

    const formData = new FormData();
    formData.append('profilePicture', file);

    return this._http.post<Response>(`${this.baseUrl}upload`, formData)
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
