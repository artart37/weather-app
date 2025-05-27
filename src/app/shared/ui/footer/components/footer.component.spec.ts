import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render footer content when provided', () => {
    const footerContent = '<div class="footer-content">Test Footer</div>';
    fixture.nativeElement.innerHTML = `<wa-footer>${footerContent}</wa-footer>`;
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('.footer-content');
    expect(content).toBeTruthy();
    expect(content.textContent.trim()).toBe('Test Footer');
  });

  it('should have correct footer structure', () => {
    const footerElement = fixture.nativeElement.querySelector('footer');
    expect(footerElement).toBeTruthy();
    expect(footerElement.classList.contains('footer')).toBeTrue();
  });
});
