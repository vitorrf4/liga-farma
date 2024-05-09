import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ContatoService} from "../../../services/contato.service";

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  form: FormGroup;

  constructor(builder: FormBuilder) {
    this.form = builder.group({
      nome: [''],
      sobrenome: [''],
      email: [''],
      telefone: [''],
      mensagem: ['']
    });
  }

  enviarMensagem() {
    const mensagem = this.form.getRawValue();

      alert("Mensagem enviada com sucesso!");
      this.form.reset();
  }
}
