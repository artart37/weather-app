import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header content when provided', () => {
    const headerContent = '<div class="header-content">Test Header</div>';
    fixture.nativeElement.innerHTML = `<wa-header>${headerContent}</wa-header>`;
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('.header-content');
    expect(content).toBeTruthy();
    expect(content.textContent.trim()).toBe('Test Header');
  });

  it('should have correct header structure', () => {
    const headerElement = fixture.nativeElement.querySelector('header');
    expect(headerElement).toBeTruthy();
    expect(headerElement.classList.contains('header')).toBeTrue();
  });
});
