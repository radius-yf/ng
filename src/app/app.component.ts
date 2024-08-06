import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Case01Component } from './case01/case01.component';
import { FormsModule } from '@angular/forms';
import { Case01Directive } from './case01/case01.directive';

@Component({
  selector: 'z-root',
  standalone: true,
  imports: [RouterOutlet, Case01Component, Case01Directive, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng18';
  value: any;
}
