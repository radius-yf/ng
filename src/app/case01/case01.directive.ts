import { Directive, forwardRef } from '@angular/core';
import { ADD_OPTIONS, AddOptions, Options } from 'ng';
import { Observable, of } from 'rxjs';

@Directive({
  selector: '[add-options]',
  standalone: true,
  providers: [
    {
      provide: ADD_OPTIONS,
      useExisting: forwardRef(() => Case01Directive),
      multi: true,
    },
  ],
})
export class Case01Directive extends AddOptions<string> {
  override refresh(search: string): Observable<Options<string>[]> {
    return of([
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ]);
  }
}
