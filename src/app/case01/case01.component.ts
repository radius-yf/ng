import { Component } from '@angular/core';
import { Case01Directive } from './case01.directive';
import { ZSelect } from 'ng';

@Component({
  selector: 'z-case01',
  standalone: true,
  imports: [ZSelect, Case01Directive],
  templateUrl: './case01.component.html',
  styleUrl: './case01.component.css',
})
export class Case01Component {}
