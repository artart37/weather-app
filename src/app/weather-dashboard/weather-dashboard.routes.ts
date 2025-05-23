import { Routes } from '@angular/router';
import { WeatherDashboardPageComponent } from './pages/weather-dashboard-page/weather-dashboard-page.component';

export const WEATHER_DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: WeatherDashboardPageComponent,
  },
];
