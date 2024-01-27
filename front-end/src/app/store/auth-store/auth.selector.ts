//auth.selector.ts
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: any) => state.feature;

export const selectUser = createSelector(
  selectFeature,
  (state: any) => state?.user // use optional chaining here
);

export const selectError = createSelector(
  selectFeature,
  (state: any) => state?.error // use optional chaining here
);
