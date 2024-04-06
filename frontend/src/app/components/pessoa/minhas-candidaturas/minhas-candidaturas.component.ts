import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Candidatura} from "../../../models/candidatura";
import {CandidaturaService} from "../../../services/candidatura.service";
import {AuthService} from "../../../services/auth.service";
import {Contrato} from "../../../models/contrato";
import {ContratoService} from "../../../services/contrato.service";
import {LoginService} from "../../../services/login.service";

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
export class MinhasCandidaturasComponent implements OnInit {
  candidaturas: Candidatura[] = [];

  constructor(private candidaturaService: CandidaturaService,
              private loginService: LoginService,
              private contratoService: ContratoService) {
  }

  ngOnInit(): void {
    const pessoaId = this.loginService.usuario?.informacoes.id || 0;
    this.candidaturaService.listarPorPessoaId(pessoaId).subscribe(res => {
      this.candidaturas = res;
    });
  }

  aceitarContrato(contrato: Contrato) {
    contrato.status = 'ACEITO';
    this.contratoService.atualizar(contrato).subscribe(res => {
      console.log(res);
    });

  }
}