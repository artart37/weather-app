import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { WeatherDashboardPageComponent } from './weather-dashboard-page.component';
import { WaAutoCompleteMultiselectComponent } from '../../../shared/ui/input/components/autocomplete-multiselect/autocomplete-multiselect.component';
import { WaCardComponent } from '../../../shared/ui/card/components/card.component';
import { WaWeatherCodePipe } from '../../../shared/pipes/weather-code/weather-code.pipe';
import { GeoLocationService } from '../../../shared/data-access/geo-location';
import { WeatherDataService } from '../../../shared/data-access/weather';

describe('WeatherDashboardPageComponent', () => {
  let component: WeatherDashboardPageComponent;
  let fixture: ComponentFixture<WeatherDashboardPageComponent>;
  let geoLocationServiceMock: jasmine.SpyObj<GeoLocationService>;
  let weatherDataServiceMock: jasmine.SpyObj<WeatherDataService>;

  beforeEach(async () => {
    geoLocationServiceMock = jasmine.createSpyObj('GeoLocationService', ['getLocationByCity']);
    weatherDataServiceMock = jasmine.createSpyObj('WeatherDataService', ['getWeatherData']);

    await TestBed.configureTestingModule({
      imports: [
        WeatherDashboardPageComponent,
        ReactiveFormsModule,
        WaAutoCompleteMultiselectComponent,
        WaCardComponent,
        WaWeatherCodePipe,
      ],
      providers: [
        { provide: GeoLocationService, useValue: geoLocationServiceMock },
        { provide: WeatherDataService, useValue: weatherDataServiceMock },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check if main container exists
    const dashboard = compiled.querySelector('.weather-dashboard');
    expect(dashboard).toBeTruthy();

    // Check if search section exists
    const search = compiled.querySelector('.weather-dashboard__search');
    expect(search).toBeTruthy();

    // Check if content section exists
    const content = compiled.querySelector('.weather-dashboard__content');
    expect(content).toBeTruthy();
  });

  it('should initialize with empty city control', () => {
    expect(component.cityControl.value).toBeNull();
    expect(component.cityControl.valid).toBeTruthy();
  });

  it('should show loading state when fetching weather data', () => {
    component.loadingSignal.set(true);
    fixture.detectChanges();

    const loadingElement = fixture.nativeElement.querySelector('.weather-dashboard__loading');
    expect(loadingElement).toBeTruthy();
  });
});
