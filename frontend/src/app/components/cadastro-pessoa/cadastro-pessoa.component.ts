import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {PdfService} from "../../services/pdf.service";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {FarmaceuticoService} from "../../services/farmaceutico.service";
import {Farmaceutico} from "../../model/farmaceutico";
import {AuthService} from "../../services/auth.service";
import {Usuario} from "../../model/usuario";

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
              private cadastroService: AuthService,
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

  onSubmit() {
    const pdfForm = new FormData();
    pdfForm.append('pdf', this.selectedFile);
    pdfForm.append('usuarioId', '1');

    this.pdfService.uploadPdf(pdfForm).subscribe(res => {
      console.log(res);
    });
  }

  cadastrarCliente() {
    let farmaceutico : Farmaceutico;
    farmaceutico = this.form.getRawValue();

    let usuario = new Usuario(
      this.form.get('email')!.value,
      this.form.get('senha')!.value,
      'PESSOA',
      farmaceutico
    );

    this.cadastroService.cadastrar(usuario).subscribe(res => {
      console.log(res);
    })
  }
}
