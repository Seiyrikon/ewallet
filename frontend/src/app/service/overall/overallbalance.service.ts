import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this._http.get<Response>(`${this.baseUrl}over-all-balance`);
  }
}
