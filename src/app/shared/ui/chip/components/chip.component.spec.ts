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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
