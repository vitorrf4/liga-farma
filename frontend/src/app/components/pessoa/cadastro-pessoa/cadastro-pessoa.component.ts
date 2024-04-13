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

@Component({
  selector: 'app-cadastro-farmaceutico',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    FormsModule,
    NgForOf,
    NgIf,
    PdfViewerModule
  ],
  templateUrl: './cadastro-pessoa.component.html',
  styleUrl: './cadastro-pessoa.component.css'
})
export class CadastroPessoaComponent implements OnInit{
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
      telefone: ["", Validators.required]
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

  cadastrarCurriculo(usuarioId: string) {
    const pdfForm = new FormData();
    pdfForm.append('pdf', this.selectedFile);
    pdfForm.append('usuarioId', usuarioId.toString());

    this.pdfService.uploadPdf(pdfForm).subscribe(res => {
      console.log(res);
    });
  }

  cadastrarCliente() {
    let farmaceutico : Farmaceutico;
    farmaceutico = this.form.getRawValue();

    const usuario = new Usuario(
      'PESSOA',
      farmaceutico
    );

    if(!this.form.valid){
      alert("Preencha o formulário corretamente!!");
      return;
    }

    this.authService.cadastrar(usuario).subscribe({
      next: res => {
          if (this.selectedFile)
          this.cadastrarCurriculo(res.informacoes.id.toString());

        this.logarUsuario(usuario);
      },
      error: () => alert('Email já cadastrado')
    })
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
