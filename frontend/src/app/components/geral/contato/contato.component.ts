import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContatoService} from "../../../services/contato.service";

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  form: FormGroup;

  constructor(private builder: FormBuilder,
              private contatoService: ContatoService) {
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
    this.contatoService.enviarMensagem(mensagem).subscribe({
      next: () => {
        alert("Mensagem enviada com sucesso!");
        this.form.reset();
      },
      error: () => alert('Erro ao enviar, tente novamente mais tarde')
    });
  }
}
