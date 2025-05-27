import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaAutoCompleteMultiselectComponent } from './autocomplete-multiselect.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('WaAutoCompleteMultiselectComponent', () => {
  let component: WaAutoCompleteMultiselectComponent;
  let fixture: ComponentFixture<WaAutoCompleteMultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaAutoCompleteMultiselectComponent, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WaAutoCompleteMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update input value when user types', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    const testValue = 'test input';

    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.signals.inputValue()).toBe(testValue);
  });

  it('should show suggestions when input has value', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    const testValue = 'test input';

    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.signals.showSuggestions()).toBeTrue();
  });
});
