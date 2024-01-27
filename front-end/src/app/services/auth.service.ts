import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://user-assessment-api.vercel.app/api/login';
  private token: string | null = null;
  private user: any = null; // Add this line

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.API_URL, { email, password });
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.token = token;
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('authToken');
    }
    return this.token || '';
  }

  setUser(user: any): void { // Add this method
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  getUser(): any { // Add this method
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }
    return this.user;
  }
}
