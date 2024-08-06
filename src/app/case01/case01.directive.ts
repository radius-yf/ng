import { Directive, forwardRef } from '@angular/core';
import { Option, OPTION_DATA_SOURCE, OptionDataSource } from '@zpyyf/ng';
import { Observable, of } from 'rxjs';

@Directive({
  selector: '[add-options]',
  standalone: true,
  providers: [
    {
      provide: OPTION_DATA_SOURCE,
      useExisting: forwardRef(() => Case01Directive),
      multi: true,
    },
  ],
})
export class Case01Directive extends OptionDataSource<string> {
  override refresh(search: string): Observable<Option<string>[]> {
    console.log('Case01Directive refresh', search);
    return of([
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ]);
  }
}
