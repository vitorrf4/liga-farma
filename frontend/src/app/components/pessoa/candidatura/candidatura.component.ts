import {Component} from '@angular/core';
import {Vaga} from "../../../models/vaga";
import {ActivatedRoute} from "@angular/router";
import {DatePipe, NgIf} from "@angular/common";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {AuthService} from "../../../services/auth.service";
import {Farmaceutico} from "../../../models/farmaceutico";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CandidaturaService} from "../../../services/candidatura.service";

@Component({
  selector: 'app-candidatura',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    PdfViewerModule,
    ReactiveFormsModule
  ],
  templateUrl: './candidatura.component.html',
  styleUrl: './candidatura.component.css'
})
export class CandidaturaComponent {
  vaga?: Vaga;
  perfil!: Farmaceutico;
  file: any;
  perfilForm: FormGroup;

  constructor(authService: AuthService,
              builder: FormBuilder,
              private candidaturaService: CandidaturaService) {
    this.vaga = history.state.vaga;

    if (authService.usuario) {
      this.perfil = authService.usuario.informacoes as Farmaceutico;
      this.file = this.perfil.curriculo;
    }

    this.perfilForm = builder.group({
      vagaId: this.vaga?.id || '0',
      farmaceuticoId: this.perfil.id,
      mensagem: ['']
    });
  }

  enviarCandidatura() {
    const candidatura = this.perfilForm.getRawValue();
    this.candidaturaService.cadastrar(candidatura).subscribe(res => {
      console.log(res);
    });
  }
}
