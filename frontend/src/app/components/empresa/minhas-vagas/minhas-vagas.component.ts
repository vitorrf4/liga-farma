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
import {HelperService} from "../../../services/helper.service";

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
  idCandidaturaAtual = 0;

  constructor(private vagaService: VagaService,
              private loginService: LoginService,
              private helper: HelperService) {}

  ngOnInit(): void {
    const empresa = this.loginService.usuario!.informacoes as Farmacia;

    this.vagaService.listarVagasPorEmpresa(empresa.id).subscribe(res => {
      this.vagas = res.sort((a, b) => b.id - a.id);
    });
  }

  baixarCurriculo(curriculo: any) {
    const byteArray = new Uint8Array(curriculo.data.data);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  }

  getFilename(curriculo: any) {
    return curriculo.filename;
  }

  atualizarContrato(contrato: Contrato) {
    const vagaIndex = this.vagas.findIndex(v => v.id == contrato.vagaId);
    const candIndex = this.vagas[vagaIndex].candidaturas.findIndex(c => {
      return c.id == contrato.candidaturaId
    });
    this.vagas[vagaIndex].candidaturas[candIndex].contrato = contrato;

    this.contrato = undefined;
  }

  async aceitarCandidatura(candidatura: Candidatura, vaga: Vaga) {
    this.contrato = new Contrato();
    this.contrato.candidatura = candidatura;
    this.contrato.vaga = vaga;
    this.idCandidaturaAtual = candidatura.id;
  }

  fecharVaga(vaga: Vaga) {
    const vagaAtualizada = vaga;
    vagaAtualizada.status = 'FECHADA';

    this.vagaService.atualizar(vagaAtualizada).subscribe({
      next: () => vaga = vagaAtualizada,
      error: () => alert('Error ao atualizar')
    });
  }

  getStatusFormatado(status: string) {
    return this.helper.getStringComPrimeiraMaiuscula(status);
  }

  getStatusClass(status: string) {
    switch (status) {
      default: case 'ABERTA': return 'status status-verde';
      case 'FECHADA': return 'status status-vermelho';
    }
  }

  getContratoStatusString(status: string) {
    switch (status) {
      default: case 'ENVIADO': return 'Proposta Enviada';
      case 'ACEITO': return 'Proposta Aceita';
    }
  }
}
