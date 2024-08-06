import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const ADD_OPTIONS = new InjectionToken<AddOptions<any>[]>('ADD_OPTIONS');

export interface Options<T = string> {
  label: string;
  value: T;
}

export abstract class AddOptions<T> {
  abstract refresh(search: string): Observable<Options<T>[]>;
}
