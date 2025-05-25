import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WaCardComponent } from '../../../shared/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wa-about',
  standalone: true,
  imports: [CommonModule, WaCardComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class WaAboutComponent {}
