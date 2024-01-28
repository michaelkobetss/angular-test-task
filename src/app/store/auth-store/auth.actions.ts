//auth.actions.ts
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);
export const navigateToDashboard = createAction('[Auth] Navigate To Dashboard');

export const loadUserFromLocalStorage = createAction('[Auth] Load User From Local Storage');


export const logout = createAction('[Auth] Logout');
