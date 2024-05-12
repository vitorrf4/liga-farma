import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../../models/usuario";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../../../services/login.service";
import {MinhasCandidaturasComponent} from "../../pessoa/minhas-candidaturas/minhas-candidaturas.component";
import {MinhasVagasComponent} from "../../empresa/minhas-vagas/minhas-vagas.component";
import {PerfilEmpresaComponent} from "../../empresa/perfil-empresa/perfil-empresa.component";
import {PerfilPessoaComponent} from "../../pessoa/perfil-pessoa/perfil-pessoa.component";
import {ContratosComponent} from "../../pessoa/contratos/contratos.component";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    PdfViewerModule,
    NgForOf,
    RouterLink,
    MinhasCandidaturasComponent,
    MinhasVagasComponent,
    PerfilEmpresaComponent,
    PerfilPessoaComponent,
    ContratosComponent
  ],
  templateUrl: './meu-perfil.component.html',
  styleUrl: './meu-perfil.component.css'
})
export class MeuPerfilComponent implements OnInit {
  usuario!: Usuario;
  tipo: string = '';
  curriculo: any;

  constructor(private loginService: LoginService,
              private router: Router) { }

  async ngOnInit() {
    const usuario = this.loginService.usuario;
    if (!usuario) {
      return await this.router.navigateByUrl('/login');
    }

    this.usuario = usuario;
    return this.tipo = this.usuario.tipo;
  }

  get isPessoa() {
    return this.tipo == 'PESSOA';
  }
}
