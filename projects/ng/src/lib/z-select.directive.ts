import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { OPTION_DATA_SOURCE, OptionDataSource } from '../option-data-source';

@Directive({
  selector: 'select[z-select]',
  standalone: true,
})
export class ZSelectDirective {
  private render = inject(Renderer2);
  private ref = inject<ElementRef<HTMLSelectElement>>(ElementRef);
  private optionDataSource = inject<OptionDataSource<string>[]>(
    OPTION_DATA_SOURCE,
    {
      optional: true,
      self: true,
    }
  );

  constructor() {
    forkJoin(this.optionDataSource?.map((i) => i.refresh('')) ?? [])
      .pipe(takeUntilDestroyed())
      .subscribe((options) => {
        Array.from(this.ref.nativeElement.children).forEach((i) => {
          this.render.removeChild(this.ref.nativeElement, i);
        });
        options.flat().forEach((i) => {
          const ele = this.render.createElement('option');
          ele.value = String(i.value);
          ele.innerText = i.label;
          this.render.appendChild(this.ref.nativeElement, ele);
        });
      });
  }
}
