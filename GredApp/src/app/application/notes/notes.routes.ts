import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./notes-main/notes-main.page').then((m) => m.NotesMainPage),
  },
  {
    path: 'note-detail',
    loadComponent: () => import('./note-detail/note-detail.page').then( m => m.NoteDetailPage)
  }

]
