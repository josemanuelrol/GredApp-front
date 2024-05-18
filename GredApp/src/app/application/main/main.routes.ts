import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main.page').then((m) => m.MainPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'notes',
        loadChildren: () => import('../notes/notes.routes').then((m) => m.routes),
      },
      {
        path: 'tasks',
        loadChildren: () => import('../tasks/tasks.routes').then((m) => m.routes),
      },
      {
        path: 'calendar',
        loadChildren: () => import('../calendar/calendar.routes').then((m) => m.routes),
      },
      {
        path: 'config',
        loadChildren: () => import('../config/config.routes').then((m) => m.routes),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  }
]
