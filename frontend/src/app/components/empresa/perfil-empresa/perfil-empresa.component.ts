import { Component } from '@angular/core';
import {MinhasCandidaturasComponent} from "../../pessoa/minhas-candidaturas/minhas-candidaturas.component";
import {MinhasVagasComponent} from "../minhas-vagas/minhas-vagas.component";
import {NgIf} from "@angular/common";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {RouterLink} from "@angular/router";
import {Farmacia} from "../../../models/farmacia";
import {Usuario} from "../../../models/usuario";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-perfil-empresa',
  standalone: true,
	imports: [
		MinhasCandidaturasComponent,
		MinhasVagasComponent,
		NgIf,
		PdfViewerModule,
		RouterLink
	],
  templateUrl: './perfil-empresa.component.html',
  styleUrl: './perfil-empresa.component.css'
})
export class PerfilEmpresaComponent {
  usuario!: Usuario;

  constructor(private login: LoginService) {
    this.usuario = login.usuario!;
  }

  get empresa() {
    return this.usuario.informacoes as Farmacia;
  }
}
