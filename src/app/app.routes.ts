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
    path: 'about',
    loadChildren: () =>
      import('./core/pages/about/about.routes').then((m) => m.ABOUT_ROUTES),
  },
  {
    path: '',
    redirectTo: 'weather-dashboard',
    pathMatch: 'full',
  },
];
