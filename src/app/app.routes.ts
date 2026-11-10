import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  { path: 'confidentialite', loadComponent: () => import('./pages/legal/privacy').then((m) => m.Privacy) },
  { path: 'conditions', loadComponent: () => import('./pages/legal/terms').then((m) => m.Terms) },
  { path: 'suppression-compte', loadComponent: () => import('./pages/legal/deletion').then((m) => m.Deletion) },
  { path: '404', loadComponent: () => import('./pages/not-found').then((m) => m.NotFound) },
  { path: '**', loadComponent: () => import('./pages/not-found').then((m) => m.NotFound) },
];
