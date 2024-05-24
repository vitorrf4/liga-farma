import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './redefinir-senha.component.html',
  styleUrl: './redefinir-senha.component.css'
})
export class RedefinirSenhaComponent {
  form: FormGroup;

  constructor(builder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
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
    const confirmar: string = this.form.value.confirmarSenha;

    if (senha !== confirmar) {
      return alert('As senhas não coincidem');
    }

    let token: string | null = '';
    let id: string | null = '';

    this.activatedRoute.queryParamMap.subscribe(r => {
      token = r.get('token');
      id = r.get('id');
    });

    const usuario = {
      token: token,
      id: id,
      senha: senha
    }

    this.service.redefinirSenha(usuario).subscribe({
      next: async () => {
        alert('Senha redefinida com sucesso');
        await this.router.navigateByUrl('/login');
      },
      error: err => {
        switch (err.status) {
          case 403: return alert('Token expirado, solicite outro email de redefinição');
          case 400: return alert('Token inválido para o usuário com esse ID');
          case 500: return alert('Erro no sistema, tente novamente mais tarde');
        }
      }
    });
  }
}
