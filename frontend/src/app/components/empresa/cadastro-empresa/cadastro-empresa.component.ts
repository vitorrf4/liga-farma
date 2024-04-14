import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {AuthService} from "../../../services/auth.service";
import {Farmaceutico} from "../../../models/farmaceutico";
import {Usuario} from "../../../models/usuario";
import {Router} from "@angular/router";
import {LoginService} from "../../../services/login.service";
import { Farmacia } from '../../../models/farmacia';

@Component({
  selector: 'app-cadastro-empresa',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
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
    let farmacia : Farmacia;
    farmacia = this.form.getRawValue();

    const usuario = new Usuario(
      'EMPRESA',
      farmacia
    );

    if(this.form.invalid){
      alert("Preencha o formulário corretamente!!");
      return;
    }

    try {
      this.authService.cadastrar(usuario).subscribe({
        next: () => {
          alert("Cadastro efetuado com sucesso!! Redirecionando para o seu perfil");
          setTimeout(() => {
              this.logarUsuario(usuario);
            }, 1000);
        },
        error: () => alert('Erro inesperado')
      })
    } catch (error) {
      alert(`Erro interno ao cadastrar: ${error}`)
    }
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