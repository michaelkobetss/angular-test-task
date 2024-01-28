import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { PAGES } from '../constants/pages';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to auth if token does not exist', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const spy = spyOn(router, 'navigate');
    expect(guard.canActivate(route, state)).toBeFalse();
    expect(spy).toHaveBeenCalledWith([PAGES.AUTH]);
  });

  it('should not redirect if token exists', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    spyOn(localStorage, 'getItem').and.returnValue('token');
    expect(guard.canActivate(route, state)).toBeTrue();
  });
});
