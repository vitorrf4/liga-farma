import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import { ContatoService } from '../../../services/contato.service';

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

  constructor(builder: FormBuilder,
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
    const contatoForm = this.form.value;
    console.log(contatoForm);

    this.contatoService.enviarMensagem(contatoForm).subscribe({
      next: () => {
        alert("Mensagem enviada com sucesso!");
        this.form.reset();
      },
      error: () => alert('Erro no envio, tente novamente mais tarde')
    });
  }
}
