import { Routes } from "@angular/router";

export const routes : Routes = [
  {
    path: '',
    loadComponent: () => import('./config-main/config-main.page').then((m) => m.ConfigMainPage),
  },  {
    path: 'user-detail',
    loadComponent: () => import('./user-detail/user-detail.page').then( m => m.UserDetailPage)
  }

]
