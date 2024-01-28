import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthRedirectGuard } from './guard/auth-redirect.guard';
import { PAGES } from './constants/pages';
import { AssessmentGraphComponent } from './pages/assessment-graph/assessment-graph.component';
import { ListUsersComponent } from './pages/users/list-users/list-users.component';

const { AUTH, DASHBOARD, ASSESSMENT_GRAPH, USERS } = PAGES;

const routes: Routes = [
  { path: AUTH, component: AuthComponent, canActivate: [AuthRedirectGuard] },
  { path: DASHBOARD, component: DashboardComponent, canActivate: [AuthGuard] },
  { path: USERS, component: ListUsersComponent, canActivate: [AuthGuard] },
  {
    path: ASSESSMENT_GRAPH + '/:id',
    component: AssessmentGraphComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: AUTH, pathMatch: 'full' },
  { path: '**', redirectTo: AUTH },
];

@NgModule({
  //hash router to work with github-pages.
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
