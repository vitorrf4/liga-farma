import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CadastrofarmaceuticoComponent } from './components/cadastrofarmaceutico/cadastrofarmaceutico.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CadastrofarmaceuticoComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'liga-farma';
}
