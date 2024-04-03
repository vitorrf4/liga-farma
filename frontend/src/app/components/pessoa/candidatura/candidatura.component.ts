import {Component} from '@angular/core';
import {Vaga} from "../../../models/vaga";
import {ActivatedRoute} from "@angular/router";
import {DatePipe, NgIf} from "@angular/common";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {AuthService} from "../../../services/auth.service";
import {Farmaceutico} from "../../../models/farmaceutico";

@Component({
  selector: 'app-candidatura',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    PdfViewerModule
  ],
  templateUrl: './candidatura.component.html',
  styleUrl: './candidatura.component.css'
})
export class CandidaturaComponent {
  vaga?: Vaga;
  perfil!: Farmaceutico;
  file: any;

  constructor(private authService: AuthService) {
    this.vaga = history.state.vaga;

    if (authService.usuario) {
      this.perfil = authService.usuario.informacoes as Farmaceutico;
      this.file = this.perfil.curriculo;
    }
  }

  enviarCandidatura() {

  }
}
