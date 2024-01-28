//auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators'; // import tap
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router'; // import Router
import { PAGES } from '../../constants/pages';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map(response => {
            this.authService.setToken(response.token);
            this.authService.setUser(response);
            return AuthActions.loginSuccess({ user: response });
          }),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );
  loadUserFromLocalStorage$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.loadUserFromLocalStorage),
    map(() => {
      const userItem = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (userItem && token) {
        let user = JSON.parse(userItem);
        user.token = token; // Add the token to the user object
        this.authService.setToken(token);
        return AuthActions.loginSuccess({ user });
      } else {
        return AuthActions.loginFailure({ error: 'No user in local storage' });
      }
    })
  )
);


  navigateToDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => this.router.navigate([PAGES.DASHBOARD])) // navigate on login success
    ),
    { dispatch: false } // set dispatch to false because this effect doesn't dispatch an action
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router // inject Router
  ) {}
}