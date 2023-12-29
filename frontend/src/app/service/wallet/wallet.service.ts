import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from 'src/app/interface/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor
  (
    private _http: HttpClient
  ) { }

  //get all the wallets of user
  getAllUserWallet(): Observable<any>
  {
    return this._http.get<Wallet[]>(`${this.baseUrl}user-wallet`);
  }
}
