import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { WeatherDataService } from './weather-data.service';
import { environment } from '../../../../../environments/environment';
import { WeatherDataRequest, WeatherDataResponse } from '../models';

describe('WeatherDataService', () => {
  let service: WeatherDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherDataService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(WeatherDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make HTTP GET request with correct parameters', () => {
    const mockRequest: WeatherDataRequest = {
      latitude: 51.5074,
      longitude: -0.1278,
      daily: ['temperature_2m_max', 'temperature_2m_min'],
      current: ['temperature_2m'],
      forecast_days: 7,
    };

    const mockResponse: WeatherDataResponse = {
      latitude: 51.5074,
      longitude: -0.1278,
      generationtime_ms: 0.1,
      utc_offset_seconds: 0,
      timezone: 'Europe/London',
      timezone_abbreviation: 'BST',
      elevation: 35,
      current_units: {
        time: 'iso8601',
        interval: 'seconds',
        weather_code: 'wmo code',
        temperature_2m: '°C',
      },
      current: {
        time: '2024-03-20T12:00',
        interval: 900,
        weather_code: 0,
        temperature_2m: 20,
      },
      daily_units: {
        time: 'iso8601',
        weather_code: 'wmo code',
        temperature_2m_max: '°C',
        temperature_2m_min: '°C',
      },
      daily: {
        time: [new Date('2024-03-20')],
        weather_code: [0],
        temperature_2m_max: [25],
        temperature_2m_min: [15],
      },
    };

    service.getWeatherData(mockRequest).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.weatherApiUrl}?latitude=51.5074&longitude=-0.1278&daily=temperature_2m_max&daily=temperature_2m_min&current=temperature_2m&forecast_days=7`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
