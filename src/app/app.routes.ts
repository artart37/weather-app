import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'weather-dashboard',
    loadChildren: () =>
      import('./weather-dashboard/weather-dashboard.routes').then(
        (m) => m.WEATHER_DASHBOARD_ROUTES
      ),
  },
  {
    path: '',
    redirectTo: 'weather-dashboard',
    pathMatch: 'full',
  },
];
