import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage
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
    alert("Mensagem enviada com sucesso!");
    this.form.reset();
  }
}
