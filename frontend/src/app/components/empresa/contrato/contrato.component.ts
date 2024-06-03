import {Component, EventEmitter, Input, Output} from '@angular/core';
import {JsonPipe, NgIf} from "@angular/common";
import {Contrato} from "../../../models/contrato";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ContratoService} from "../../../services/contrato.service";

@Component({
  selector: 'app-contrato',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.css'
})
export class ContratoComponent {
  @Input() contrato!: Contrato;
  @Output() contratoAtualizado = new EventEmitter();
  form: FormGroup;

  constructor(private builder: FormBuilder,
              private contratoService: ContratoService) {
    this.form = builder.group({
      dataInicio: [],
      dataFim: []
    });
  }

  enviarContrato() {
    this.contrato.dataInicio = this.form.get('dataInicio')?.value;
    this.contrato.dataFim = this.form.get('dataFim')?.value;

    this.contrato.candidatura.farmaceutico.curriculo = undefined;
    this.contrato.vagaId = this.contrato.vaga.id;
    this.contrato.candidaturaId = this.contrato.candidatura.id;

    this.contratoService.cadastrar(this.contrato).subscribe({
      next: res => {
        alert('Contrato enviado!');
        this.atualizarContrato(res);
      },
      error: () => alert('Erro no envio, tente novamente mais tarde')
    });
  }

  atualizarContrato(contrato1: Contrato) {
    this.contratoAtualizado.emit(contrato1);
  }
}
