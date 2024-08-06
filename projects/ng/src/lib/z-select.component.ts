import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest, forkJoin, map, switchMap } from 'rxjs';
import { ControlValueAccessorBase } from '../control-value-accessor-base';
import {
  Option,
  OPTION_DATA_SOURCE,
  OptionDataSource,
} from '../option-data-source';

@Component({
  selector: 'z-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <select
      [(ngModel)]="value"
      (ngModelChange)="modelChange($event)"
      [disabled]="disabled()"
    >
      @for (item of data | async; track $index) {
      <option [value]="item.value">{{ item.label }}</option>
      }
    </select>
  `,
  styles: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZSelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZSelectComponent<T> extends ControlValueAccessorBase<T> {
  options = input<Option<T>[]>([]);

  private $search = new BehaviorSubject<string>('');

  private addOptions = inject<OptionDataSource<T>[]>(OPTION_DATA_SOURCE, {
    optional: true,
    self: true,
  });

  data = combineLatest([
    toObservable(this.options),
    this.$search.pipe(
      switchMap((s) =>
        forkJoin(this.addOptions?.map((i) => i.refresh(s)) ?? [])
      )
    ),
  ]).pipe(map((val) => val.flat(2)));

  modelChange(value: T) {
    this.onChange(value);
    this.onTouched();
  }
}
