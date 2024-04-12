import { Component } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RouterLink } from '@angular/router';
import { Farmaceutico } from '../../../models/farmaceutico';
import { Usuario } from '../../../models/usuario';
import { LoginService } from '../../../services/login.service';
import { PdfService } from '../../../services/pdf.service';
import {MinhasCandidaturasComponent} from "../minhas-candidaturas/minhas-candidaturas.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-perfil-pessoa',
  standalone: true,
  imports: [
    PdfViewerModule,
    RouterLink,
    MinhasCandidaturasComponent,
    NgIf
  ],
  templateUrl: './perfil-pessoa.component.html',
  styleUrls: ['./perfil-pessoa.component.css']
})
export class PerfilPessoaComponent {
  usuario!: Usuario;
  curriculo: any;

  constructor(
    private pdfService: PdfService,
    private login: LoginService) {
    this.usuario = this.login.usuario!;

    // carrega curriculo se o usuário tiver um
    if (this.pessoa.curriculoId) {
      this.pdfService.getPdfByUsuarioId(this.pessoa.id).subscribe({
        next: async res => {
          this.curriculo = res;
        },
        error: () => console.log('Erro ao carregar curriculo')
      });
    }
  }

  get pessoa() {
    return this.usuario.informacoes as Farmaceutico;
  }
}
