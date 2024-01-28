import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API } from '../constants/API';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store'; // import Store
import * as AuthActions from '../store/auth-store/auth.actions'; // import AuthActions

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private user: any = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private store: Store) {} // inject Store

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

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.token = null;
    this.user = null;
    this.store.dispatch(AuthActions.logout()); // dispatch logout action
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token || '';
  }

  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  getUser(): any {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }
    return this.user;
  }
}
