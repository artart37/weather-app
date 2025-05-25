import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  selector: 'wa-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaInputComponent),
      multi: true,
    },
  ],
})
export class WaInputComponent implements ControlValueAccessor, OnInit {
  @Input() disabled = false;
  @Input() label = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Output() cleared = new EventEmitter<string>();

  value = '';
  showClearButton = false;
  touched = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  constructor() {}

  ngOnInit(): void {}

  writeValue(value: string): void {
    this.value = value;
    this.showClearButton = !!value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.showClearButton = !!value;
    this.onChange(value);
  }

  handleBlur(): void {
    this.touched = true;
    this.onTouched();
  }

  handleClear(): void {
    const previousValue = this.value;
    this.value = '';
    this.showClearButton = false;
    this.onChange(this.value);
    this.cleared.emit(previousValue);
  }
}
