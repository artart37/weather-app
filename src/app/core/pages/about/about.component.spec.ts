import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaAboutComponent } from './about.component';

describe('WaAboutComponent', () => {
  let component: WaAboutComponent;
  let fixture: ComponentFixture<WaAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaAboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WaAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
