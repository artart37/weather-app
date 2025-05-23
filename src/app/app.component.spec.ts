import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the header title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('header');
    expect(title?.textContent).toContain('Weather Dashboard');
  });

  it('should have the correct page structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check if header exists
    const header = compiled.querySelector('header');
    expect(header).toBeTruthy();

    // Check if content exists
    const content = compiled.querySelector('main');
    expect(content).toBeTruthy();

    // Check if footer exists
    const footer = compiled.querySelector('footer');
    expect(footer).toBeTruthy();
  });
});
