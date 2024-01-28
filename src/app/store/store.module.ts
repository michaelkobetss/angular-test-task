//store.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule as NgRxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './auth-store/auth.reducer';
import { AuthEffects } from './auth-store/auth.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgRxStoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class StoreModule { }
