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
    RouterLink
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
      telefone: [this.pessoa.telefone],
      especializacao: [this.pessoa.especializacao],
      curriculo: [null],
      curriculoId: [this.pessoa.curriculoId],
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

  atualizarInformacoes() {
    const farmaceutico = this.form.getRawValue();

    this.farmaceuticoService.atualizar(farmaceutico).subscribe({
      next: async () => {
        const usuario = new Usuario('PESSOA', farmaceutico);
        const pessoa = usuario.informacoes as Farmaceutico;

        if (this.selectedFile) {
          const curriculoId = await this.atualizarCurriculo();
          pessoa.curriculoId = Number(curriculoId);
        }

        this.loginService.atualizarInformacoes(pessoa);
        await this.router.navigateByUrl('/perfil');
      },
      error: err => {
        console.log(err);
      }
    });
  }

  async atualizarCurriculo(): Promise<string> {
    const pdfForm = new FormData();
    pdfForm.append('pdf', this.selectedFile);
    pdfForm.append('usuarioId', this.pessoa.id.toString());

    const curriculoId = await firstValueFrom(this.pdfService.uploadPdf(pdfForm))

    return curriculoId.curriculoId;
  }
}
