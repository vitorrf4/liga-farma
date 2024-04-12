import { Component } from '@angular/core';
import {MinhasCandidaturasComponent} from "../minhas-candidaturas/minhas-candidaturas.component";
import {MinhasVagasComponent} from "../../empresa/minhas-vagas/minhas-vagas.component";
import {NgIf} from "@angular/common";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {RouterLink} from "@angular/router";
import {Farmaceutico} from "../../../models/farmaceutico";
import {Usuario} from "../../../models/usuario";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-perfil-pessoa',
  standalone: true,
	imports: [
		MinhasCandidaturasComponent,
		MinhasVagasComponent,
		NgIf,
		PdfViewerModule,
		RouterLink
	],
  templateUrl: './perfil-pessoa.component.html',
  styleUrl: './perfil-pessoa.component.css'
})
export class PerfilPessoaComponent {
  usuario!: Usuario;

  constructor(login: LoginService) {
    this.usuario = login.usuario!;
  }

  get pessoa() {
    return this.usuario.informacoes as Farmaceutico;
  }
}
