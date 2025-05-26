import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  from,
  map,
  mergeMap,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

import { GeoLocationResult, GeoLocationService } from '../../../shared/data-access/geo-location';
import { WeatherDataRequest, WeatherDataService } from '../../../shared/data-access/weather';
import { WaWeatherCodePipe } from '../../../shared/pipes';
import { AutocompleteSuggestion, WaCardComponent } from '../../../shared/ui';
import { WeatherDataForDisplay } from '../models';
import { WaAutoCompleteMultiselectComponent } from './../../../shared/ui/input/components';

@Component({
  selector: 'wa-weather-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WaAutoCompleteMultiselectComponent,
    WaCardComponent,
    WaWeatherCodePipe,
  ],
  templateUrl: './weather-dashboard-page.component.html',
  styleUrls: ['./weather-dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDashboardPageComponent implements OnInit {
  private geoLocation$ = inject(GeoLocationService);
  private unsubscribe$ = new Subject<void>();
  private weather$ = inject(WeatherDataService);

  private weatherDataSubject$ = new BehaviorSubject<WeatherDataForDisplay[]>([]);
  weatherData$ = this.weatherDataSubject$.asObservable();

  cityControl = new FormControl<string | null>(null);
  loadingSignal = signal<boolean>(false);
  searchResultRemovedSignal = signal<WeatherDataForDisplay | null>(null);
  suggestionsSignal = signal<GeoLocationResult[]>([]);
  suggestionsComputed = computed<AutocompleteSuggestion<GeoLocationResult>[]>(() => {
    return this.suggestionsSignal()
      ? this.suggestionsSignal().map(suggestion => {
          const displayProperties = [
            suggestion.name,
            suggestion.country,
            suggestion.admin1,
            suggestion.admin2,
          ]
            .filter(value => !!value)
            .join(', ');
          return {
            id: suggestion.id,
            data: suggestion,
            displayProperty: displayProperties,
          };
        })
      : [];
  });

  private fetchWeatherForSuggestion(
    suggestion: AutocompleteSuggestion<GeoLocationResult>,
  ): Observable<WeatherDataForDisplay> {
    const { latitude, longitude } = suggestion.data;
    const request: WeatherDataRequest = {
      latitude,
      longitude,
      daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min'],
      current: ['weather_code', 'temperature_2m'],
      forecast_days: 7,
    };

    return this.weather$.getWeatherData(request).pipe(
      map(data => ({
        id: suggestion.id,
        location: suggestion.displayProperty,
        data,
      })),
    );
  }

  ngOnInit(): void {
    this.cityControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(v => (v ? v.length > 2 : false)),
        takeUntil(this.unsubscribe$),
        switchMap(searchQuery => {
          const request = {
            name: searchQuery as string,
            count: 10,
            language: 'en',
            format: 'json',
          };
          return this.geoLocation$.getLocationByCity(request).pipe();
        }),
      )
      .subscribe(value => {
        this.suggestionsSignal.set(value.results);
      });
  }

  handleSelectedSuggestions(selectedLocations: AutocompleteSuggestion<GeoLocationResult>[]): void {
    this.loadingSignal.set(true);

    if (!selectedLocations?.length) {
      this.weatherDataSubject$.next([]);
      this.loadingSignal.set(false);
      return;
    }

    const weatherRequests$ = from(selectedLocations).pipe(
      takeUntil(this.unsubscribe$),
      tap(() => {
        this.weatherDataSubject$.next([]);
      }),
      mergeMap(suggestion => this.fetchWeatherForSuggestion(suggestion)),
      finalize(() => this.loadingSignal.set(false)),
    );

    weatherRequests$.subscribe({
      next: weatherResult => {
        const currentData = this.weatherDataSubject$.getValue();
        this.weatherDataSubject$.next([...currentData, weatherResult]);
      },
      error: err => {
        console.error('Failed to fetch weather data:', err);
        this.loadingSignal.set(false);
      },
    });
  }

  removeLocation(weatherItem: WeatherDataForDisplay): void {
    this.searchResultRemovedSignal.set(weatherItem);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
