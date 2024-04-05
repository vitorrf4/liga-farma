import { Component } from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Candidatura} from "../../../models/candidatura";
import {CandidaturaService} from "../../../services/candidatura.service";
import {AuthService} from "../../../services/auth.service";
import {Contrato} from "../../../models/contrato";

@Component({
  selector: 'app-minhas-candidaturas',
  standalone: true,
	imports: [
		DatePipe,
		NgForOf,
		NgIf
	],
  templateUrl: './minhas-candidaturas.component.html',
  styleUrl: './minhas-candidaturas.component.css'
})
export class MinhasCandidaturasComponent {
  candidaturas: Candidatura[] = [];

  constructor(private candidaturaService: CandidaturaService,
              private  authService: AuthService) {
    const pessoaId = authService.usuario?.informacoes.id || 0;
    this.candidaturaService.listarPorPessoaId(pessoaId).subscribe(res => {
      this.candidaturas = res;
    });
  }

  aceitarContrato(candidatura: Candidatura, contrato: Contrato) {

  }
}
