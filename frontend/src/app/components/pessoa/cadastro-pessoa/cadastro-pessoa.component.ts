import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {PdfService} from "../../../services/pdf.service";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {Farmaceutico} from "../../../models/farmaceutico";
import {AuthService} from "../../../services/auth.service";
import {Usuario} from "../../../models/usuario";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-cadastro-farmaceutico',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    FormsModule,
    NgxMaskDirective,
    NgForOf,
    NgIf,
    PdfViewerModule
  ],
  templateUrl: './cadastro-pessoa.component.html',
  styleUrl: './cadastro-pessoa.component.css'
})
export class CadastroPessoaComponent implements OnInit {
  form!: FormGroup;
  selectedFile: any;
  fileUrl: any = '';

  constructor(private pdfService: PdfService,
              private authService: AuthService,
              private loginService: LoginService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ["", Validators.required],
      cpf: ["", Validators.required],
      crf: ["", Validators.required],
      email: ["", Validators.required],
      senha: ["", Validators.required],
      telefone: [""]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.loadFile();
  }

  loadFile(): void {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target && e.target.result) {
        this.fileUrl = e.target.result;
      }
    };
    reader.readAsDataURL(this.selectedFile);
  }

  cadastrarCliente() {
    if (!this.clienteEstaValido()) return;

    const farmaceutico: Farmaceutico = this.form.getRawValue();
    const usuario = new Usuario(
      'PESSOA',
      farmaceutico
    );

    this.authService.cadastrar(usuario).subscribe({
      next: async res => {
        if (this.selectedFile) {
          await this.cadastrarCurriculo(res.informacoes.id);
        }

        alert("Cadastro efetuado com sucesso. Redirecionando para o seu perfil");
        this.logarUsuario(usuario);
      },
      error: res => {
        switch (res.status) {
          case 400: return alert('Email já cadastrado');
          default: case 500: return alert('Erro ao cadastrar, tente novamente mais tarde');
        }
      }
    });
  }

  clienteEstaValido() {
    if (this.form.invalid) {
      alert("Preencha todos os campos");
      return false;
    }

    if (!this.selectedFile) {
      return true;
    }

    const extensaoCurriculo = this.selectedFile?.name.split('.').pop().toLowerCase();

    if (extensaoCurriculo != 'pdf') {
      alert('Currículo deve ser um pdf');
      return false;
    }

    if (this.selectedFile?.size > 5000000) {
      alert("O arquivo deve ter menos de 5mb");
      return false;
    }

    return true;
  }

  async cadastrarCurriculo(usuarioId: number) {
    const pdfForm = new FormData();
    pdfForm.append('pdf', this.selectedFile);
    pdfForm.append('usuarioId', usuarioId.toString());

    this.pdfService.uploadPdf(pdfForm).subscribe({
      error: () => {
        alert('Erro ao cadastrar curriculo');
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
      error: () => { console.log('Erro ao logar')}
    })
  }
}
