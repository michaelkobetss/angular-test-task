import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthRedirectGuard } from './auth-redirect.guard';
import { PAGES } from '../constants/pages';

describe('AuthRedirectGuard', () => {
  let guard: AuthRedirectGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthRedirectGuard,
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    });
    guard = TestBed.inject(AuthRedirectGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to dashboard if token exists', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    spyOn(localStorage, 'getItem').and.returnValue('token');
    const spy = spyOn(router, 'navigate');
    expect(guard.canActivate(route, state)).toBeFalse();
    expect(spy).toHaveBeenCalledWith([PAGES.DASHBOARD]);
  });

  it('should not redirect if token does not exist', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(guard.canActivate(route, state)).toBeTrue();
  });
});
