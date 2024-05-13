import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {Candidatura} from "../../../models/candidatura";
import {CandidaturaService} from "../../../services/candidatura.service";
import {Contrato} from "../../../models/contrato";
import {ContratoService} from "../../../services/contrato.service";
import {LoginService} from "../../../services/login.service";
import {HelperService} from "../../../services/helper.service";

@Component({
  selector: 'app-minhas-candidaturas',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './minhas-candidaturas.component.html',
  styleUrl: './minhas-candidaturas.component.css'
})
export class MinhasCandidaturasComponent implements OnInit {
  candidaturas: Candidatura[] = [];
  candidaturasFiltradas: Candidatura[] = [];

  constructor(private candidaturaService: CandidaturaService,
              private loginService: LoginService,
              private contratoService: ContratoService,
              private helperService: HelperService) { }

  ngOnInit(): void {
    const pessoaId = this.loginService.usuario?.informacoes.id || 0;
    this.candidaturaService.listarPorPessoaId(pessoaId).subscribe(res => {
      this.candidaturas = res.sort((a, b) => b.id - a.id);
      this.candidaturasFiltradas = this.candidaturas;
    });
  }

  mudarStatusContrato(contrato: Contrato, status: string) {
    contrato.status = status;
    this.contratoService.atualizar(contrato).subscribe({
      error: () => alert('Erro ao atualizar')
    });
  }

  getStatusClass(status: string) {
    switch (status) {
      default: case 'ABERTA': return 'status status-verde';
      case 'FECHADA': return 'status status-vermelho';
    }
  }

  getStatusFormatado(status: string) {
    return this.helperService.getStringComPrimeiraMaiuscula(status);
  }

  filtrarVagas(status?: string) {
    switch (status) {
      case 'CONTRATOS':
        return this.candidaturasFiltradas = this.candidaturas.filter(c =>
          c.contrato?.status === 'ACEITO');
      case 'PROPOSTAS':
        return this.candidaturasFiltradas = this.candidaturas.filter(c =>
          c.contrato?.status === 'ENVIADO');
      default:
        return this.candidaturasFiltradas = this.candidaturas;
    }
  }
}
