import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "../../../services/login.service";
import {Router, RouterLink} from "@angular/router";
import {Usuario} from "../../../models/usuario";
import {FarmaceuticoService} from "../../../services/farmaceutico.service";
import {Farmaceutico} from "../../../models/farmaceutico";
import {JsonPipe, NgIf} from "@angular/common";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {PerfilPessoaComponent} from "../perfil-pessoa/perfil-pessoa.component";
import {PdfService} from "../../../services/pdf.service";
import {firstValueFrom} from "rxjs";
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-editar-pessoa',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    PdfViewerModule,
    JsonPipe,
    PerfilPessoaComponent,
    RouterLink,
    NgxMaskDirective
  ],
  templateUrl: './editar-pessoa.component.html',
  styleUrl: './editar-pessoa.component.css'
})
export class EditarPessoaComponent implements OnInit {
  form!: FormGroup;
  pessoa!: Farmaceutico;
  selectedFile: any;
  fileUrl: any = '';

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder,
              private farmaceuticoService: FarmaceuticoService,
              private pdfService: PdfService,
              private router: Router) {}


  ngOnInit() {
    this.pessoa = this.loginService.usuario!.informacoes as Farmaceutico;

    this.form = this.formBuilder.group({
      id: [this.pessoa.id],
      nome: [this.pessoa.nome, Validators.required],
      crf: [this.pessoa.crf, Validators.required],
      email: [this.pessoa.email, Validators.required],
      senha: [''],
      telefone: [this.pessoa.telefone],
      especializacao: [this.pessoa.especializacao],
      curriculo: [null],
      curriculoId: [this.pessoa.curriculoId],
    });

    if (this.pessoa.curriculoId) {
      this.pdfService.getPdfByUsuarioId(this.pessoa.id).subscribe({
        next: async res => this.fileUrl = res.data
      });
    }
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

  atualizarInformacoes() {
    const farmaceutico = this.form.getRawValue();

    this.farmaceuticoService.atualizar(farmaceutico).subscribe({
      next: async () => {
        if (this.selectedFile) {
          const curriculoId = await this.atualizarCurriculo();
          farmaceutico.curriculoId = Number(curriculoId);
        }

        this.loginService.atualizarInformacoes(farmaceutico);
        await this.router.navigateByUrl('/perfil');
      },
      error: () => alert('Erro ao atualizar, tente novamente mais tarde')
    });
  }

  async atualizarCurriculo() {
    const pdfForm = new FormData();
    pdfForm.append('pdf', this.selectedFile);
    pdfForm.append('usuarioId', this.pessoa.id.toString());

    const res = await firstValueFrom(this.pdfService.uploadPdf(pdfForm));
    return res.curriculoId;
  }
}
