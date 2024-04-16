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
  curriculoUrl: any;

  constructor(
    private pdfService: PdfService,
    private login: LoginService) {
    this.usuario = this.login.usuario!;

    if (this.pessoa.curriculoId) {
      this.pdfService.getPdfByUsuarioId(this.pessoa.id).subscribe({
        next: async res => {
          this.curriculo = res;
          this.baixarCurriculo();
        }
      });
    }
  }

  baixarCurriculo() {
    const byteArray = new Uint8Array(this.curriculo.data.data);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    this.curriculoUrl = URL.createObjectURL(blob);
  }

  get pessoa() {
    return this.usuario.informacoes as Farmaceutico;
  }
}
