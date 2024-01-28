import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API } from '../constants/API';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store'; // import Store
import * as AuthActions from '../store/auth-store/auth.actions'; // import AuthActions
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private user: any = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private store: Store, private router: Router) {}

  // Attempt to log in, show error message if login fails
  login(email: string, password: string): Observable<any> {
    return this.http.post(API.URL_LOGIN, { email, password }).pipe(
      catchError((error: any) => {
        this.snackBar.open(`Wrong email or password.`, 'Close', {
          duration: 5000,
        });
        return throwError(error);
      })
    );
  }

  // Log out, clear local storage, dispatch logout action, and reload the page
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.token = null;
    this.user = null;
    this.store.dispatch(AuthActions.logout()); 
    window.location.reload()
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Set token in local storage and in-memory variable
  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  // Get token from in-memory variable or local storage
  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token || '';
  }

  // Set user in local storage and in-memory variable
  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  // Get user from in-memory variable or local storage
  getUser(): any {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }
    return this.user;
  }
}
