import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tasks-main/tasks-main.page').then((m) => m.TasksMainPage),
  },
  {
    path: 'tasklist/:id',
    loadComponent: () => import('./task-list-detail/task-list-detail.page').then( m => m.TaskListDetailPage)
  },
  {
    path: 'completed-tasks',
    loadComponent: () => import('./completed-tasks/completed-tasks.page').then( m => m.CompletedTasksPage)
  }


]
