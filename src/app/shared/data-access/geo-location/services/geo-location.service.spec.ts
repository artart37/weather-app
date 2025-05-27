import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { GeoLocationService } from './geo-location.service';
import { environment } from '../../../../../environments/environment';
import { GeoLocationRequest, GeoLocationResponse, GeoLocationResult, FeatureCode } from '../models';

describe('GeoLocationService', () => {
  let service: GeoLocationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoLocationService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(GeoLocationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make HTTP GET request with correct parameters', () => {
    const mockRequest: GeoLocationRequest = {
      name: 'London',
      count: 10,
      language: 'en',
      format: 'json',
    };

    const mockResult: GeoLocationResult = {
      id: 1,
      name: 'London',
      latitude: 51.5074,
      longitude: -0.1278,
      elevation: 35,
      feature_code: FeatureCode.Pplc,
      country_code: 'GB',
      admin1_id: 1,
      timezone: 'Europe/London',
      country_id: 1,
      country: 'United Kingdom',
      admin1: 'England',
    };

    const mockResponse: GeoLocationResponse = {
      results: [mockResult],
      generationtime_ms: 0.1,
    };

    service.getLocationByCity(mockRequest).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.geoLocationApiUrl}?name=London&count=10&language=en&format=json`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
