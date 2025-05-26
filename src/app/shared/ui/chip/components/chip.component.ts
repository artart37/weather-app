import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'wa-chip',
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class WaChipComponent {
  @Input() chip: string | null = null;
  @Output() chipRemoved = new EventEmitter<string>();

  handleRemoveChip(chip: string): void {
    this.chipRemoved.emit(chip);
  }
}
