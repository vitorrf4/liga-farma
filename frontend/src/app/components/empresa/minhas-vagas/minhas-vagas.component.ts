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
  vagasDb: Vaga[] = [];
  vagas: Vaga[] = [];
  contrato?: Contrato;
  idCandidaturaAtual = 0;
  curriculoUrl : any;

  constructor(private vagaService: VagaService,
              private loginService: LoginService,
              private helper: HelperService) {}

  ngOnInit(): void {
    const empresa = this.loginService.usuario!.informacoes as Farmacia;

    this.vagaService.listarVagasPorEmpresa(empresa.id).subscribe(res => {
      this.vagasDb = res.sort((a, b) => b.id - a.id);
      this.vagas = this.vagasDb;
    });
  }

  baixarCurriculo(curriculo: any) {
    const byteArray = new Uint8Array(curriculo.data.data);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    this.curriculoUrl = URL.createObjectURL(blob);
  }

  getFilename(curriculo: any) {
    return curriculo.filename;
  }

  atualizarContrato(contrato: Contrato) {
    const vagaIndex = this.vagasDb.findIndex(v => v.id == contrato.vagaId);
    const candIndex = this.vagasDb[vagaIndex].candidaturas.findIndex(c => {
      return c.id == contrato.candidaturaId
    });
    this.vagasDb[vagaIndex].candidaturas[candIndex].contrato = contrato;

    this.contrato = undefined;
  }

  async aceitarCandidatura(candidatura: Candidatura, vaga: Vaga) {
    this.contrato = new Contrato();
    this.contrato.candidatura = candidatura;
    this.contrato.vaga = vaga;
    this.idCandidaturaAtual = candidatura.id;
  }

  fecharVaga(vaga: Vaga) {
    const vagaAtualizada = {
      id: vaga.id,
      status: 'FECHADA'
    };

    this.vagaService.atualizarStatus(vagaAtualizada).subscribe({
      next: () => vaga.status = vagaAtualizada.status,
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
      case 'REJEITADO': return 'Proposta Rejeitada';
      case 'FINALIZADO': return 'Contrato Encerrado';
    }
  }

  filtrarVagas(status: string = '') {
    if (!status) {
      return this.vagas = this.vagasDb;
    }

    return this.vagas = this.vagasDb.filter(v => v.status == status);
  }
}
