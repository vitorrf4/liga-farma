import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FarmaceuticoComponentComponent } from './components/farmaceutico-component/farmaceutico-component.component';
import { FarmaciaComponentComponent } from './components/farmacia-component/farmacia-component.component';
import { VagaComponentComponent } from './components/vaga-component/vaga-component.component';
import { ContratoComponentComponent } from './components/contrato-component/contrato-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FarmaceuticoComponentComponent,
    FarmaciaComponentComponent,
    VagaComponentComponent,
    ContratoComponentComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'liga-farma';
}
