import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tasks-main/tasks-main.page').then((m) => m.TasksMainPage),
  }
]
