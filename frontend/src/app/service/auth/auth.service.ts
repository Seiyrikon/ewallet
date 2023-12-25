import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  constructor() { }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isTokenValid(): boolean {
    const token = this.getToken();

    return !!token; // Example: Return true if the token exists, modify this based on your validation logic
  }
}
