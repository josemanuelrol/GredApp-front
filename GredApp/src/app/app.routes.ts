import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'app',
    loadChildren: () => import('./main/main.routes').then((m) => m.routes),
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  }
];
