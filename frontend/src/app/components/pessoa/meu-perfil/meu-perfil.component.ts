import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../../models/usuario";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {Farmaceutico} from "../../../models/farmaceutico";
import {Router} from "@angular/router";
import {Farmacia} from "../../../models/farmacia";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    PdfViewerModule,
    NgForOf
  ],
  templateUrl: './meu-perfil.component.html',
  styleUrl: './meu-perfil.component.css'
})
export class MeuPerfilComponent implements OnInit {
  usuario!: Usuario;
  tipo: string = '';
  file: any;

  constructor(private loginService: LoginService,
              private router: Router) { }

  async ngOnInit() {
    const usuario = this.loginService.usuario;
    if (!usuario) {
      return await this.router.navigateByUrl('/login');
    }

    this.usuario = usuario;
    this.tipo = this.usuario.tipo;

    if (this.tipo === 'PESSOA') {
      const farma = this.usuario.informacoes as Farmaceutico;
      this.file = farma.curriculo;
    }

    console.log(this.empresa);
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
}
