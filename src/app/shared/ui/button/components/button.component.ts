import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wa-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class WaButtonComponent {
  @Input() active = false;
  @Input() accent = false;
  @Input() disabled = false;
  @Input() solid = false;
  @Input() tabular = false;
  @Input() type: 'button' | 'submit' = 'button';
}
