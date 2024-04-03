import { Component } from '@angular/core';
import {Usuario} from "../../models/usuario";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {Farmaceutico} from "../../models/farmaceutico";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    PdfViewerModule,
    NgForOf
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  usuario!: Usuario;
  file: any;

  constructor(private authService: AuthService) {
    this.usuario = authService.usuario;

    if (this.usuario) {
      const farma = this.usuario.informacoes as Farmaceutico;
      this.file = farma.curriculo;

      console.log(this.file);
    }
  }
}
