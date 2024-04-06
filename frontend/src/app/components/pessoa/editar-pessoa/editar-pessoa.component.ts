import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import {Usuario} from "../../../models/usuario";
import {FarmaceuticoService} from "../../../services/farmaceutico.service";
import {Farmaceutico} from "../../../models/farmaceutico";
import {JsonPipe, NgIf} from "@angular/common";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {PdfService} from "../../../services/pdf.service";

@Component({
  selector: 'app-editar-pessoa',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    PdfViewerModule,
    JsonPipe
  ],
  templateUrl: './editar-pessoa.component.html',
  styleUrl: './editar-pessoa.component.css'
})
export class EditarPessoaComponent implements OnInit {
  form!: FormGroup;
  pessoa!: Farmaceutico;
  // file: any;
  // fileUrl: any = '';

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder,
              private farmaceuticoService: FarmaceuticoService,
              private router: Router) {}


  ngOnInit() {
    this.pessoa = this.loginService.usuario!.informacoes as Farmaceutico;

    this.form = this.formBuilder.group({
      id: [this.pessoa.id],
      nome: [this.pessoa.nome, Validators.required],
      crf: [this.pessoa.crf, Validators.required],
      email: [this.pessoa.email, Validators.required],
      telefone: [this.pessoa.telefone],
      especializacao: [this.pessoa.especializacao],
      curriculo: [null],
    });
  }

  atualizarInformacoes() {
    const farmaceutico = this.form.getRawValue();

    this.farmaceuticoService.atualizar(farmaceutico).subscribe({
      next: async () => {
        const usuario = new Usuario('PESSOA', farmaceutico);
        this.loginService.atualizarInformacoes(usuario.informacoes);
        await this.router.navigateByUrl('/perfil');
      },
      error: err => {
        console.log(err);
      }
    });

    // this.atualizarCurriculo();
  }

  // get debug() {
  //   return this.file.filename;
  // }

  // onFileSelected(event: any): void {
  //   const selectedFile = event.target.files[0];
  //   if (selectedFile) {
  //     this.loadFile(selectedFile);
  //   }
  // }
  //
  // loadFile(selectedFile: File) {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.result) {
  //       this.file = selectedFile;
  //       this.fileUrl = reader.result;
  //     }
  //   };
  //
  //   reader.readAsArrayBuffer(selectedFile);
  // }
  //
  // atualizarCurriculo() {
  //   if (this.file) {
  //     const pdfForm = new FormData();
  //     pdfForm.append('pdf', this.file);
  //     pdfForm.append('usuarioId', this.pessoa.id.toString());
  //
  //     this.pdfService.uploadPdf(pdfForm).subscribe(res => {
  //       console.log(res);
  //     });
  //   } else {
  //     console.log('no file');
  //   }
  // }
}
