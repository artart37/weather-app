import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaButtonComponent } from './button.component';

describe('WaButtonComponent', () => {
  let component: WaButtonComponent;
  let fixture: ComponentFixture<WaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WaButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.primary).toBeFalse();
    expect(component.disabled).toBeFalse();
    expect(component.solid).toBeFalse();
    expect(component.type).toBe('button');
  });

  it('should update button type when input changes', () => {
    component.type = 'submit';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('type')).toBe('submit');
  });

  it('should apply primary class when primary is true', () => {
    component.primary = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('primary')).toBeTrue();
  });

  it('should apply solid class when solid is true', () => {
    component.solid = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('solid')).toBeTrue();
  });

  it('should be disabled when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });
});
