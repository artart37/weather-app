import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaAutoCompleteMultiselectComponent } from './autocomplete-multiselect.component';

describe('WaAutoCompleteMultiselectComponent', () => {
  let component: WaAutoCompleteMultiselectComponent<unknown>;
  let fixture: ComponentFixture<WaAutoCompleteMultiselectComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaAutoCompleteMultiselectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WaAutoCompleteMultiselectComponent<unknown>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
