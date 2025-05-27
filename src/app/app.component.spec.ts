import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/ui/header/components/header.component';
import { FooterComponent } from './shared/ui/footer/components/footer.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HeaderComponent, FooterComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the header title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.header__title span');
    expect(title?.textContent).toContain('WeatherApp');
  });

  it('should have the correct page structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check if header exists
    const header = compiled.querySelector('header');
    expect(header).toBeTruthy();
    expect(header?.classList.contains('header')).toBeTrue();

    // Check if content exists
    const content = compiled.querySelector('main');
    expect(content).toBeTruthy();

    // Check if footer exists
    const footer = compiled.querySelector('footer');
    expect(footer).toBeTruthy();
    expect(footer?.classList.contains('footer')).toBeTrue();
  });
});
