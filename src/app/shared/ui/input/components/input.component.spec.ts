import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaInputComponent } from './input.component';

describe('WaInputComponent', () => {
  let component: WaInputComponent;
  let fixture: ComponentFixture<WaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
