import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./calendar-main/calendar-main.page').then((m) => m.CalendarMainPage),
  }
]
