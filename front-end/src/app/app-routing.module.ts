import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthRedirectGuard } from './guard/auth-redirect.guard';
import { PAGES } from './constants/pages';
const { AUTH, DASHBOARD } = PAGES;

const routes: Routes = [
  { path: AUTH, component: AuthComponent, canActivate: [AuthRedirectGuard] },
  { path: DASHBOARD, component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: AUTH, pathMatch: 'full' },
  { path: '**', redirectTo: AUTH },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
