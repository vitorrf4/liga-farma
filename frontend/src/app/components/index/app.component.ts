import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

import { FarmaceuticoComponent } from '../farmaceutico/farmaceutico.component';
import { FarmaciaComponent } from '../farmacia/farmacia.component';
import { ContratoComponent } from '../contrato/contrato.component';
import {ListaVagasComponent} from "../lista-vagas/lista-vagas.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FarmaceuticoComponent,
    FarmaciaComponent,
    ListaVagasComponent,
    ContratoComponent,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
