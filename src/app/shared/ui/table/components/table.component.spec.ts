import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaTableComponent } from './table.component';
import { TableHeader, TableRow } from '../models';

interface TestData {
  id: number;
  name: string;
  active: boolean;
}

describe('WaTableComponent', () => {
  let component: WaTableComponent<TestData>;
  let fixture: ComponentFixture<WaTableComponent<TestData>>;

  const mockHeaders: TableHeader<TestData>[] = [
    { key: 'name', label: 'Name' },
    { key: 'active', label: 'Active' },
  ];

  const mockData: TableRow<TestData>[] = [
    { id: 1, name: 'Test 1', active: true },
    { id: 2, name: 'Test 2', active: false },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WaTableComponent<TestData>);
    component = fixture.componentInstance;
    component.headers = mockHeaders;
    component.data = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display headers correctly', () => {
    const headerCells = fixture.nativeElement.querySelectorAll('th');
    expect(headerCells.length).toBe(mockHeaders.length);
    expect(headerCells[0].textContent.trim()).toBe('Name');
    expect(headerCells[1].textContent.trim()).toBe('Active');
  });

  it('should display data rows correctly', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockData.length);
  });

  it('should track by id when available', () => {
    const result = component.trackById(0, {
      id: 1,
      name: 'Test',
      active: true,
    });
    expect(result).toBe(1);
  });

  it('should track by index when id is not available', () => {
    const result = component.trackById(2, { name: 'Test', active: true });
    expect(result).toBe(2);
  });

  it('should handle null data', () => {
    component.data = null;
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(0);
  });

  it('should handle null headers', () => {
    component.headers = null;
    fixture.detectChanges();
    const headerCells = fixture.nativeElement.querySelectorAll('th');
    expect(headerCells.length).toBe(0);
  });
});
