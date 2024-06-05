import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main.page').then((m) => m.MainPage),
    children: [
      {
        path: 'tasks',
        loadChildren: () => import('../tasks/tasks.routes').then((m) => m.routes),
      },
      {
        path: 'notes',
        loadChildren: () => import('../notes/notes.routes').then((m) => m.routes),
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
        redirectTo: 'tasks',
        pathMatch: 'full',
      }
    ]
  }
]
