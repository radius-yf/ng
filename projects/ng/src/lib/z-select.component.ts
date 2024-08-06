import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, forkJoin, map, switchMap } from 'rxjs';
import { ADD_OPTIONS, AddOptions, Options } from '../add-options';
import { ControlValueAccessorBase } from '../control-value-accessor-base';

@Component({
  selector: 'z-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <select [(ngModel)]="value" (ngModelChange)="modelChange($event)">
      @for (item of data | async; track $index) {
      <option [value]="item.value">{{ item.label }}</option>
      }
    </select>
  `,
  styles: ``,
})
export class ZSelect<T> extends ControlValueAccessorBase<T> {
  options = input<Options<T>[]>([]);

  private $search = new BehaviorSubject<string>('');

  private addOptions = inject<AddOptions<T>[]>(ADD_OPTIONS, {
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
