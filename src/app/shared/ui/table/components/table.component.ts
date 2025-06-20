import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TableHeader, TableRow } from '../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'wa-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class WaTableComponent<T> {
  @Input() data: TableRow<T>[] | null = null;
  @Input() headers: TableHeader<T>[] | null = null;

  trackById(index: number, item: any): number | string {
    if (item.hasOwnProperty('id')) {
      return item.id;
    } else {
      return index;
    }
  }
}
