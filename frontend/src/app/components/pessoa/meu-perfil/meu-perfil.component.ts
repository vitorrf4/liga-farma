import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../../models/usuario";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {Farmaceutico} from "../../../models/farmaceutico";
import {Router} from "@angular/router";
import {Farmacia} from "../../../models/farmacia";

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
  usuario?: Usuario;
  file: any;
  tipo: string = '';
  farmacia?: Farmacia;

  constructor(private authService: AuthService,
              private router: Router) { }

  async ngOnInit() {
    this.usuario = this.authService.usuario;

    if (!this.usuario) {
      return await this.router.navigateByUrl('/login');
    }

    this.tipo = this.usuario.tipo;

    if (this.tipo === 'EMPRESA') {
      return this.farmacia = this.usuario.informacoes as Farmacia;
    }

    const farma = this.usuario.informacoes as Farmaceutico;
    this.file = farma.curriculo;

    return;
  }
}
