import { ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export class ControlValueAccessorBase<T> implements ControlValueAccessor {
  value = new BehaviorSubject<T | null>(null);
  onChange: (value: T) => void = () => {};
  onTouched: () => void = () => {};
  disabled = new BehaviorSubject<boolean>(false);

  writeValue(value: T | null): void {
    this.value.next(value);
  }

  registerOnChange(fn: (value: T) => void): void {
    console.log('test', fn);
    
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.next(isDisabled);
  }
}
