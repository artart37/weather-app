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

  it('should render header content when provided', () => {
    const headerContent = '<div class="wa-card-header">Test Header</div>';
    fixture.nativeElement.innerHTML = `<wa-card>${headerContent}</wa-card>`;
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('.wa-card-header');
    expect(header).toBeTruthy();
    expect(header.textContent.trim()).toBe('Test Header');
  });

  it('should render body content when provided', () => {
    const bodyContent = '<div class="wa-card-body">Test Body</div>';
    fixture.nativeElement.innerHTML = `<wa-card>${bodyContent}</wa-card>`;
    fixture.detectChanges();

    const body = fixture.nativeElement.querySelector('.wa-card-body');
    expect(body).toBeTruthy();
    expect(body.textContent.trim()).toBe('Test Body');
  });
});
