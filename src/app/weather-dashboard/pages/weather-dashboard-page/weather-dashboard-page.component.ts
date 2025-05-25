import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WaInputComponent } from '../../../shared/ui';

@Component({
  selector: 'wa-weather-dashboard-page',
  imports: [CommonModule, WaInputComponent],
  templateUrl: './weather-dashboard-page.component.html',
  styleUrls: ['./weather-dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDashboardPageComponent {}
