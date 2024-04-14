import {Component,  OnInit,} from '@angular/core';
import {VagaService} from "../../../services/vaga.service";
import {Vaga} from "../../../models/vaga";
import {Farmacia} from "../../../models/farmacia";
import {CurrencyPipe, DatePipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Candidatura} from "../../../models/candidatura";
import {LoginService} from "../../../services/login.service";
import {Contrato} from "../../../models/contrato";
import {CandidaturaComponent} from "../../pessoa/candidatura/candidatura.component";
import {ContratoComponent} from "../contrato/contrato.component";

@Component({
  selector: 'app-minhas-vagas',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf,
    DatePipe,
    NgIf,
    CurrencyPipe,
    RouterLink,
    CandidaturaComponent,
    ContratoComponent
  ],
  templateUrl: './minhas-vagas.component.html',
  styleUrl: './minhas-vagas.component.css'
})
export class MinhasVagasComponent implements OnInit {
  vagas: Vaga[] = [];
  contrato?: Contrato;
  index = 0;

  constructor(private vagaService: VagaService,
              private loginService: LoginService) {}

  ngOnInit(): void {
    const empresa = this.loginService.usuario?.informacoes as Farmacia;
    if (!empresa) {
      return;
    }

    this.vagaService.listarVagasPorEmpresa(empresa.id).subscribe(res => {
      this.vagas = res.sort((a, b) => b.id - a.id);
    });
  }

  atualizarContrato(contrato: Contrato) {
    const vagaIndex = this.vagas.findIndex(v => v.id == contrato.vagaId);
    const candIndex = this.vagas[vagaIndex].candidaturas.findIndex(c => {
      return c.id == contrato.candidaturaId
    });
    this.vagas[vagaIndex].candidaturas[candIndex].contrato = contrato;

    this.contrato = undefined;
  }

  async aceitarCandidatura(candidatura: Candidatura, vaga: Vaga, index: number) {
    this.contrato = new Contrato();
    this.contrato.candidatura = candidatura;
    this.contrato.vaga = vaga;
    this.index = index;
  }

  fecharVaga(vaga: Vaga) {
    vaga.status = 'FECHADA';
    this.vagaService.atualizar(vaga).subscribe(res => {
      console.log(res);
    });
  }

  getStatusClass(status: string) {
    switch (status) {
      default: case 'ABERTA': return 'span-aberta';
      case 'FECHADA': return 'span-fechada';
    }
  }

  getStatusFormatado(str: string) {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getContratoStatusString(status: string) {
    switch (status) {
      default: case 'ENVIADO': return 'Proposta Enviada';
      case 'ACEITO': return 'Proposta Aceita';
    }
  }
}
