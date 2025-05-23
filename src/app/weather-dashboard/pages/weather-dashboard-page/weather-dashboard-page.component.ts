import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'wa-weather-dashboard-page',
    imports: [CommonModule],
    templateUrl: './weather-dashboard-page.component.html',
    styleUrls: ['./weather-dashboard-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDashboardPageComponent {}
