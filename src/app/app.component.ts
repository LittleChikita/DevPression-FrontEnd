import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {SelectComponent} from './select/select.component';
import {TableComponent} from './table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SelectComponent, TableComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'catalogo';
}
