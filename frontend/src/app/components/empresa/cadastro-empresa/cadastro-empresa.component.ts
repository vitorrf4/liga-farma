import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {AuthService} from "../../../services/auth.service";
import {Usuario} from "../../../models/usuario";
import {Router} from "@angular/router";
import {LoginService} from "../../../services/login.service";
import { Farmacia } from '../../../models/farmacia';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-cadastro-empresa',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgxMaskDirective,
    PdfViewerModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-empresa.component.html',
  styleUrl: './cadastro-empresa.component.css'
})
export class CadastroEmpresaComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private loginService: LoginService,
              private router: Router) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ["", Validators.required],
      cnpj: ["", Validators.required],
      endereco: ["", Validators.required],
      descricao: ["", Validators.required],
      email: ["", Validators.required],
      senha: ["", Validators.required],
      telefone: [""]
    });
  }

  cadastrarCliente() {
    if (this.form.invalid) {
      alert("Preencha todos os campos");
      return;
    }

    const farmacia: Farmacia = this.form.getRawValue();
    const usuario = new Usuario(
      'EMPRESA',
      farmacia
    );

    this.authService.cadastrar(usuario).subscribe({
      next: () => {
        alert("Cadastro efetuado com sucesso!! Redirecionando para o seu perfil");
        this.logarUsuario(usuario);
      },
      error: res => {
        switch (res.status) {
          case 400: return alert('Email já cadastrado');
          default: case 500: return alert('Erro ao cadastrado, tente novamente mais tarde');
        }
      }
    });
  }

  logarUsuario(usuario: Usuario) {
    const email = usuario.informacoes.email;
    const senha = usuario.informacoes.senha;

    this.authService.login({email, senha}).subscribe({
      next: async res => {
        this.loginService.setUsuario(res);
        await this.router.navigateByUrl('perfil');
      },
      error: () => { console.log('erro ao logar')}
    })
  }
}
