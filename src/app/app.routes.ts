import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'app',
    loadChildren: () => import('./application/main/main.routes').then((m) => m.routes),
    canMatch: [authGuard]
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
  {
    path: 'config-main',
    loadComponent: () => import('./application/config/config-main/config-main.page').then( m => m.ConfigMainPage)
  }
];
