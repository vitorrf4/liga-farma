import {Component, OnInit} from '@angular/core';
import {Vaga} from "../../../models/vaga";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {AuthService} from "../../../services/auth.service";
import {Farmaceutico} from "../../../models/farmaceutico";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CandidaturaService} from "../../../services/candidatura.service";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-candidatura',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    PdfViewerModule,
    ReactiveFormsModule,
    CurrencyPipe
  ],
  templateUrl: './candidatura.component.html',
  styleUrl: './candidatura.component.css'
})
export class CandidaturaComponent implements OnInit {
  vaga?: Vaga;
  perfil!: Farmaceutico;
  file: any;
  perfilForm!: FormGroup;

  constructor(private loginService: LoginService,
              private builder: FormBuilder,
              private router: Router,
              private candidaturaService: CandidaturaService) {
  }

  ngOnInit(): void {
    this.vaga = history.state.vaga;

    if (this.loginService.usuario) {
      this.perfil = this.loginService.usuario.informacoes as Farmaceutico;
      this.file = this.perfil.curriculo;
    }

    this.perfilForm = this.builder.group({
      vagaId: this.vaga?.id || '0',
      farmaceuticoId: this.perfil.id,
      mensagem: ['']
    });
  }

  enviarCandidatura() {
    const candidatura = this.perfilForm.getRawValue();

    this.candidaturaService.cadastrar(candidatura).subscribe({
      next: async () => {
        alert("Candidatura enviada com sucesso!");
        await this.router.navigateByUrl('/vagas');
      }
    });
  }
}
