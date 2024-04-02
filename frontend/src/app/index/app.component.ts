import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

import { FarmaceuticoComponent } from '../components/farmaceutico/farmaceutico.component';
import { FarmaciaComponent } from '../components/farmacia/farmacia.component';
import { ContratoComponent } from '../components/contrato/contrato.component';
import {ListaVagasComponent} from "../components/lista-vagas/lista-vagas.component";

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
