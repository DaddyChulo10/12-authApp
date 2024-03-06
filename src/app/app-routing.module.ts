import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';

const routes: Routes = [
  {
    path: 'Auth',
    canActivate:[isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'Dashboard',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  // 2213444826
  {
    path: '**',
    redirectTo: 'Auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
