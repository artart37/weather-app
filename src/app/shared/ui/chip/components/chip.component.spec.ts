import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaChipComponent } from './chip.component';

describe('WaChipComponent', () => {
  let component: WaChipComponent;
  let fixture: ComponentFixture<WaChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WaChipComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display chip text when provided', () => {
    const chipText = 'Test Chip';
    component.chip = chipText;
    fixture.detectChanges();

    const chipElement = fixture.nativeElement.querySelector('.wa-chip__text');
    expect(chipElement).toBeTruthy();
    expect(chipElement.textContent.trim()).toBe(chipText);
  });

  it('should emit chipRemoved event when remove button is clicked', () => {
    const chipText = 'Test Chip';
    component.chip = chipText;
    fixture.detectChanges();

    const spy = spyOn(component.chipRemoved, 'emit');
    const removeButton = fixture.nativeElement.querySelector('.wa-chip__remove');

    removeButton.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(chipText);
  });
});
