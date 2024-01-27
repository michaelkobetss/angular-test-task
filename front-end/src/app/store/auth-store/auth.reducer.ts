//auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure } from './auth.actions';

export const initialState = {
  user: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(login, state => state),
  on(loginSuccess, (state, { user }) => ({ ...state, user })),
  on(loginFailure, (state, { error }) => ({ ...state, error }))
);
