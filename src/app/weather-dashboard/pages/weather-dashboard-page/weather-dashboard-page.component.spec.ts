import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherDashboardPageComponent } from './weather-dashboard-page.component';

describe('WeatherDashboardPageComponent', () => {
  let component: WeatherDashboardPageComponent;
  let fixture: ComponentFixture<WeatherDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherDashboardPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.weather-dashboard__title');
    expect(title?.textContent).toContain('Weather Dashboard');
  });

  it('should have the correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check if main container exists
    const dashboard = compiled.querySelector('.weather-dashboard');
    expect(dashboard).toBeTruthy();

    // Check if header exists
    const header = compiled.querySelector('header');
    expect(header).toBeTruthy();

    // Check if content exists
    const content = compiled.querySelector('main');
    expect(content).toBeTruthy();

    // Check if search section exists
    const search = compiled.querySelector('.weather-dashboard__search');
    expect(search).toBeTruthy();

    // Check if cities section exists
    const cities = compiled.querySelector('.weather-dashboard__cities');
    expect(cities).toBeTruthy();

    // Check if footer exists
    const footer = compiled.querySelector('footer');
    expect(footer).toBeTruthy();
  });
});
