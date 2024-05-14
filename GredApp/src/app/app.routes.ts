import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'notes',
    loadChildren: () => import('./notes/notes.routes').then((m) => m.routes),
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.routes').then((m) => m.routes),
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.routes').then((m) => m.routes),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
