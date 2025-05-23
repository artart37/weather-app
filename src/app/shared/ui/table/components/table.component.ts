import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TableHeader, TableRow } from '../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wa-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class WaTableComponent<T> {
  @Input() data: TableRow<T>[] | null = [];
  @Input() headers: TableHeader<T>[] | null = [];

  trackById(index: number, item: any): number | string {
    if (item.hasOwnProperty('id')) {
      return item.id;
    } else {
      return index;
    }
  }
}
