import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './redefinir-senha.component.html',
  styleUrl: './redefinir-senha.component.css'
})
export class RedefinirSenhaComponent {
  form: FormGroup;

  constructor(private builder: FormBuilder,
              private router: ActivatedRoute,
              private service: AuthService) {
    this.form = builder.group({
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required],
    });
  }

  redefinirSenha() {
    if (this.form.invalid) {
      return alert('Preencha todos os campos');
    }

    const senha: string = this.form.value.senha;
    if (!senha) {
      return;
    }

    let token: string | null = '';
    let id: string | null = '';

    this.router.queryParamMap.subscribe(r => {
      token = r.get('token');
      id = r.get('id');
    });


    const usuario = {
      token: token,
      id: id,
      senha: senha
    }

    this.service.redefinirSenha(usuario).subscribe({
      next: value => {
        console.log(value);
      },
      error: err => {
        console.log(err);
      }
    });

  }
}
