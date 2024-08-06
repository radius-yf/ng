import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const OPTION_DATA_SOURCE = new InjectionToken<OptionDataSource<any>[]>('OPTION_DATA_SOURCE');

export interface Option<T = string> {
  label: string;
  value: T;
}

export abstract class OptionDataSource<T> {
  abstract refresh(search: string): Observable<Option<T>[]>;
}
