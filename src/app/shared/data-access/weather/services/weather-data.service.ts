import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { WeatherDataRequest, WeatherDataResponse } from '../models';
import { removeEmptyProperties } from '../../../utils';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  private readonly WEATHER_URL = environment.weatherApiUrl;
  private http = inject(HttpClient);

  getWeatherData(request: WeatherDataRequest): Observable<WeatherDataResponse> {
    const params = new HttpParams({
      fromObject: { ...removeEmptyProperties(request) },
    });
    return this.http.get<WeatherDataResponse>(this.WEATHER_URL, {
      params,
    });
  }
}
