import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'wa-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
})
export class WaCardComponent {}
