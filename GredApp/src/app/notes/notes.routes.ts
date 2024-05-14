import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./notes-main/notes-main.page').then((m) => m.NotesMainPage),
  }
]
