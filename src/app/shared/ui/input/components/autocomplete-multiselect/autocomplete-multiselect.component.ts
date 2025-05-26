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
import { WaButtonComponent } from '../../../button';
import { AutocompleteSuggestion } from '../../models.ts';
import { WaChipComponent } from '../../../chip';
import { WeatherDataForDisplay } from '../../../../../weather-dashboard/pages';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, WaButtonComponent, WaChipComponent],
  selector: 'wa-autocomplete-multiselect',
  templateUrl: './autocomplete-multiselect.component.html',
  styleUrls: ['./autocomplete-multiselect.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaAutoCompleteMultiselectComponent),
      multi: true,
    },
  ],
})
export class WaAutoCompleteMultiselectComponent<T = unknown> implements ControlValueAccessor {
  private elementRef = inject(ElementRef);

  @Input() disabled = false;
  @Input() label = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() type = 'text';

  @Input() set searchResultRemoved(value: WeatherDataForDisplay | null) {
    if (!value) return;

    const filterOut = (suggestions: AutocompleteSuggestion<T>[]) =>
      suggestions.filter(suggestion => suggestion.id !== value.id);

    this.signals.appliedSuggestions.update(filterOut);
    this.signals.selectedSuggestions.update(filterOut);
    this.applied.emit(this.signals.appliedSuggestions());
  }

  @Input() set suggestions(value: AutocompleteSuggestion<T>[]) {
    this.signals.suggestions.set(value);
  }

  @Output() applied = new EventEmitter<AutocompleteSuggestion<T>[]>();

  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;

  readonly signals = {
    suggestions: signal<AutocompleteSuggestion<T>[]>([]),
    inputValue: signal<string>(''),
    selectedIndex: signal<number>(-1),
    showSuggestions: signal<boolean>(false),
    appliedSuggestions: signal<AutocompleteSuggestion<T>[]>([]),
    selectedSuggestions: signal<AutocompleteSuggestion<T>[]>([]),
  };

  readonly computed = {
    showInputClearButton: computed(() => Boolean(this.signals.inputValue())),
    hasSelectedSuggestions: computed(() => this.signals.selectedSuggestions().length > 0),
    chipTexts: computed(() => {
      const suggestions = this.signals.appliedSuggestions();
      return suggestions ? suggestions.map(s => s.displayProperty) : [];
    }),
  };

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.signals.inputValue.set(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  readonly handlers = {
    input: (event: Event): void => {
      const value = (event.target as HTMLInputElement).value;
      this.signals.inputValue.set(value);
      this.signals.showSuggestions.set(true);
      this.signals.selectedIndex.set(-1);
      this.onChange(value);
    },
    blur: (): void => {
      this.onTouched();
    },
    clear: (): void => {
      this.signals.inputValue.set('');
      this.signals.showSuggestions.set(false);
      this.onChange('');
    },
  };

  readonly suggestionMethods = {
    toggle: (suggestion: AutocompleteSuggestion<T>): void => {
      const current = this.signals.selectedSuggestions();
      const isSelected = current.some(s => s.id === suggestion.id);

      if (isSelected) {
        const updated = current.filter(s => s.id !== suggestion.id);
        this.signals.selectedSuggestions.set(updated);
      } else {
        const updated = [...current, suggestion];
        this.signals.selectedSuggestions.set(updated);
      }
    },
    apply: (): void => {
      this.signals.appliedSuggestions.set(this.signals.selectedSuggestions());
      this.applied.emit(this.signals.appliedSuggestions());
      this.signals.showSuggestions.set(false);
    },
    clearSelection: (): void => {
      this.signals.appliedSuggestions.set([]);
      this.signals.selectedSuggestions.set([]);
      this.applied.emit([]);
    },
    isSelected: (suggestion: AutocompleteSuggestion<T>): boolean => {
      return this.signals.selectedSuggestions().some(s => s.id === suggestion.id);
    },
  };

  readonly chips = {
    remove: (suggestion: AutocompleteSuggestion<T>): void => {
      const filterOut = (s: AutocompleteSuggestion<T>) => s.id !== suggestion.id;

      const filtered = this.signals.selectedSuggestions().filter(filterOut);

      this.signals.selectedSuggestions.set(filtered);
      this.signals.appliedSuggestions.set(filtered);

      this.applied.emit(filtered);

      if (filtered.length === 0) {
        this.signals.showSuggestions.set(false);
      }
    },
  };

  private readonly keyboard = {
    handleKeyDown: (event: KeyboardEvent): void => {
      if (!this.signals.showSuggestions()) return;

      const currentIndex = this.signals.selectedIndex();
      const suggestions = this.signals.suggestions();

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          this.signals.selectedIndex.set(Math.min(currentIndex + 1, suggestions.length - 1));
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.signals.selectedIndex.set(Math.max(currentIndex - 1, 0));
          break;
        case 'Enter':
          event.preventDefault();
          if (currentIndex >= 0) {
            this.suggestionMethods.toggle(suggestions[currentIndex]);
          }
          break;
        case 'Escape':
          this.signals.showSuggestions.set(false);
          break;
      }
    },
  };

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.signals.showSuggestions.set(false);
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    this.keyboard.handleKeyDown(event);
  }
}
