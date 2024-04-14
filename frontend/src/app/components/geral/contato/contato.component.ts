import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  form: FormGroup;

  constructor(private builder: FormBuilder) {
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
