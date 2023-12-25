import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private tokenKey = 'token';
  constructor() { }

  logout(): void
  {
    localStorage.removeItem(this.tokenKey);
  }
}
