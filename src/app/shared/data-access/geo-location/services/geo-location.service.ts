import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { GeoLocationRequest, GeoLocationResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  private readonly GEOCODING_URL = environment.geoLocationApiUrl;
  private http = inject(HttpClient);

  getLocationByCity(
    request: GeoLocationRequest
  ): Observable<GeoLocationResponse> {
    const params = new HttpParams({
      fromObject: { ...request },
    });
    return this.http.get<GeoLocationResponse>(this.GEOCODING_URL, {
      params,
    });
  }
}
