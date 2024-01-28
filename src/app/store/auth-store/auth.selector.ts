//auth.selector.ts
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: any) => state.feature;

export const selectUser = createSelector(
  (state: any) => state.auth?.user, 
  (user: any) => user
);

export const selectError = createSelector(
  selectFeature,
  (state: any) => state?.error 
);

