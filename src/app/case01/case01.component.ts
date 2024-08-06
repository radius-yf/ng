import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZSelectComponent, ZSelectDirective } from "@zpyyf/ng";
import { Case01Directive } from './case01.directive';

@Component({
  selector: 'z-case01',
  standalone: true,
  imports: [ZSelectDirective, Case01Directive, FormsModule, ZSelectComponent],
  templateUrl: './case01.component.html',
  styleUrl: './case01.component.css',
})
export class Case01Component {
  value = signal('');
}
