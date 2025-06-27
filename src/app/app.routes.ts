import { Routes } from '@angular/router';
import { Route } from './shared/routes/route';

export const routes: Routes = [
  {
    path: Route.CONVERTER,
    loadComponent: () =>
      import('./feature/converter/converter').then((m) => m.Converter),
  },
  { path: '', redirectTo: Route.CONVERTER, pathMatch: 'full' },
  { path: '**', redirectTo: Route.CONVERTER },
];
