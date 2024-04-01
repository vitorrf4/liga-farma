import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FarmaceuticoComponent } from './components/farmaceutico/farmaceutico.component';
import { FarmaciaComponent } from './components/farmacia/farmacia.component';
import { VagaComponent } from './components/vaga/vaga.component';
import { ContratoComponent } from './components/contrato/contrato.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FarmaceuticoComponent,
    FarmaciaComponent,
    VagaComponent,
    ContratoComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'liga-farma';
}
