import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './esqueci-senha.component.html',
  styleUrl: './esqueci-senha.component.css'
})
export class EsqueciSenhaComponent {
  form: FormGroup;

  constructor(private builder: FormBuilder,
              private service: AuthService) {
    this.form = builder.group({
      email: ['', Validators.required]
    });
  }

  enviarEmailRedefinicao() {
    const email = this.form.getRawValue();

    this.service.enviarEmailRedefinicao(email).subscribe({
      next: value => {
        alert('Email de recuperação enviado, cheque sua caixa de entrada!');
      },
      error: err => {
        if (err.status === 404) {
          return alert('Nenhum usuário cadastrado com esse email');
        }

        if (err.status === 500) {
          return alert('Erro no sistema, tente novamente mais tarde');
        }
      }
    })

  }
}
