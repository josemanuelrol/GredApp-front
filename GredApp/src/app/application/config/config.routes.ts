import { Routes } from "@angular/router";

export const routes : Routes = [
  {
    path: '',
    loadComponent: () => import('./config-main/config-main.page').then((m) => m.ConfigMainPage),
  }
]
