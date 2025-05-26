import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  inject,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WaButtonComponent } from '../../button';
import { AutocompleteSuggestion } from '../models.ts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, WaButtonComponent],
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
export class WaInputComponent<T> implements ControlValueAccessor {
  private elementRef = inject(ElementRef);

  @Input() disabled = false;
  @Input() label = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() type = 'text';

  @Input() set suggestions(value: AutocompleteSuggestion<T>[]) {
    this.suggestionsSignal.set(value);
  }

  @Output() search = new EventEmitter<string>();
  @Output() applied = new EventEmitter<AutocompleteSuggestion<T>[]>();

  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;

  suggestionsSignal = signal<AutocompleteSuggestion<T>[]>([]);
  inputValueSignal = signal('');
  selectedIndexSignal = signal(-1);
  showSuggestionsSignal = signal(false);
  selectedSuggestionsSignal = signal<AutocompleteSuggestion<T>[]>([]);

  showClearButton = computed(() => !!this.inputValueSignal());
  hasSelectedSuggestions = computed(() => this.selectedSuggestionsSignal().length > 0);

  private onChange: (value: AutocompleteSuggestion<T>[]) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: AutocompleteSuggestion<T>[]): void {
    const displayValues = value?.map(v => v.displayProperty).join(', ') || '';
    this.inputValueSignal.set(displayValues);
    this.selectedSuggestionsSignal.set(value || []);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputValueSignal.set(value);
    this.search.emit(value);
    this.showSuggestionsSignal.set(true);
    this.selectedIndexSignal.set(-1);
  }

  handleBlur(): void {
    this.onTouched();
  }

  handleClear(): void {
    this.inputValueSignal.set('');
    this.selectedSuggestionsSignal.set([]);
    this.onChange([]);
    this.showSuggestionsSignal.set(false);
  }

  toggleSuggestion(suggestion: AutocompleteSuggestion<T>): void {
    const current = this.selectedSuggestionsSignal();
    const isSelected = current.some(s => s.displayProperty === suggestion.displayProperty);

    if (isSelected) {
      const updated = current.filter(s => s.displayProperty !== suggestion.displayProperty);
      this.selectedSuggestionsSignal.set(updated);
    } else {
      const updated = [...current, suggestion];
      this.selectedSuggestionsSignal.set(updated);
    }

    this.onChange(this.selectedSuggestionsSignal());
  }

  handleApply(): void {
    this.onChange(this.selectedSuggestionsSignal());
    this.applied.emit(this.selectedSuggestionsSignal());
    this.showSuggestionsSignal.set(false);
  }

  handleClearSelection(): void {
    this.selectedSuggestionsSignal.set([]);
    this.onChange([]);
  }

  isSuggestionSelected(suggestion: AutocompleteSuggestion<T>): boolean {
    return this.selectedSuggestionsSignal().some(
      (s: AutocompleteSuggestion<T>) => s.displayProperty === suggestion.displayProperty,
    );
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showSuggestionsSignal.set(false);
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.showSuggestionsSignal()) return;

    const currentIndex = this.selectedIndexSignal();
    const suggestions = this.suggestionsSignal();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndexSignal.set(Math.min(currentIndex + 1, suggestions.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndexSignal.set(Math.max(currentIndex - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        if (currentIndex >= 0) {
          this.toggleSuggestion(suggestions[currentIndex]);
        }
        break;
      case 'Escape':
        this.showSuggestionsSignal.set(false);
        break;
    }
  }
}
