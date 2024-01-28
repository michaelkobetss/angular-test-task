import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { API } from '../constants/API';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  let snackBar: MatSnackBar;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: { post: () => of({}) } },
        { provide: MatSnackBar, useValue: { open: () => {} } },
        { provide: Store, useValue: { dispatch: () => {} } }
      ]
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    snackBar = TestBed.inject(MatSnackBar);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    const spy = spyOn(httpClient, 'post').and.callThrough();
    service.login('test', 'test');
    expect(spy).toHaveBeenCalledWith(API.URL_LOGIN, { email: 'test', password: 'test' });
  });

  it('should handle login error', () => {
    spyOn(httpClient, 'post').and.returnValue(throwError('error'));
    const spy = spyOn(snackBar, 'open');
    service.login('test', 'test').subscribe(
      () => {},
      () => {
        expect(spy).toHaveBeenCalledWith(`Wrong email or password.`, 'Close', { duration: 5000 });
      }
    );
  });

  it('should logout', () => {
    const spy = spyOn(store, 'dispatch');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('authToken')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(service.getToken()).toEqual('');
    expect(service.getUser()).toEqual({});
    expect(spy).toHaveBeenCalled();
  });

  it('should check if user is logged in', () => {
    localStorage.setItem('token', 'token');
    expect(service.isLoggedIn()).toBeTrue();
    localStorage.removeItem('token');
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should set and get token', () => {
    service.setToken('token');
    expect(localStorage.getItem('token')).toEqual('token');
    expect(service.getToken()).toEqual('token');
  });

  it('should set and get user', () => {
    const user = { id: 1, name: 'Test' };
    service.setUser(user);
    expect(JSON.parse(localStorage.getItem('user') || '{}')).toEqual(user);
    expect(service.getUser()).toEqual(user);
  });
});
