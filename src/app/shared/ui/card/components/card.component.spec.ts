import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaCardComponent } from './card.component';

describe('WaCardComponent', () => {
  let component: WaCardComponent;
  let fixture: ComponentFixture<WaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
