import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../../models/usuario";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {Farmaceutico} from "../../../models/farmaceutico";
import {Router, RouterLink} from "@angular/router";
import {Farmacia} from "../../../models/farmacia";
import {LoginService} from "../../../services/login.service";
import {PdfService} from "../../../services/pdf.service";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    PdfViewerModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './meu-perfil.component.html',
  styleUrl: './meu-perfil.component.css'
})
export class MeuPerfilComponent implements OnInit {
  usuario!: Usuario;
  tipo: string = '';
  curriculo: any;

  constructor(private loginService: LoginService,
              private pdfService: PdfService,
              private router: Router) { }

  async ngOnInit() {
    const usuario = this.loginService.usuario;
    if (!usuario) {
      return await this.router.navigateByUrl('/login');
    }

    this.usuario = usuario;
    this.tipo = this.usuario.tipo;

    if (this.tipo === 'PESSOA') {
      this.pdfService.getPdfByUsuarioId(this.pessoa.id).subscribe({
        next: res => this.curriculo = res,
      });
    }

    return;
  }

  get isPessoa() {
    return this.tipo == 'PESSOA';
  }

  get pessoa() {
    return this.usuario.informacoes as Farmaceutico;
  }

  get empresa() {
    return this.usuario.informacoes as Farmacia;
  }

  async irParaEdicao() {
    switch (this.tipo) {
      case 'EMPRESA': return await this.router.navigateByUrl('/editar-e');
      case 'PESSOA': return await this.router.navigateByUrl('/editar-p');
      default: return;
    }
  }
}
