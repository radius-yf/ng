import { signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export class ControlValueAccessorBase<T> implements ControlValueAccessor {
  value = signal<T | null>(null);
  onChange: (value: T) => void = () => {};
  onTouched: () => void = () => {};
  disabled = signal<boolean>(false);

  writeValue(value: T | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
