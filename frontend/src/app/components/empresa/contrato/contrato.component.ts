import { Component } from '@angular/core';
import {Vaga} from "../../../models/vaga";
import {Candidatura} from "../../../models/candidatura";
import {JsonPipe} from "@angular/common";
import {Contrato} from "../../../models/contrato";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ContratoService} from "../../../services/contrato.service";

@Component({
  selector: 'app-contrato',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.css'
})
export class ContratoComponent {
  vaga: Vaga;
  candidatura: Candidatura;
  contrato: Contrato = new Contrato();
  form: FormGroup;

  constructor(private builder: FormBuilder,
              private contratoService: ContratoService) {
    this.vaga = history.state.vaga;
    this.candidatura = history.state.candidatura;

    this.contrato.candidaturaId = this.candidatura.id;
    this.contrato.farmaciaId = this.vaga.farmacia.id;
    this.contrato.vagaId = this.vaga.id;

    this.form = builder.group({
      dataInicio: [],
      dataFim: []
    });
  }

  enviarContrato() {
    this.contrato.dataInicio = this.form.get('dataInicio')?.value;
    this.contrato.dataFim = this.form.get('dataFim')?.value;

    this.contratoService.cadastrar(this.contrato).subscribe(res => {
      console.log(res);
    });
  }
}
