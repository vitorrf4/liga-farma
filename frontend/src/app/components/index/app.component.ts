import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

import {ListaVagasComponent} from "../geral/lista-vagas/lista-vagas.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ListaVagasComponent,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
