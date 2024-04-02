import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {PdfService} from "../../services/pdf.service";
import {PdfViewerModule} from "ng2-pdf-viewer";

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
  selectedFile!: File;
  pdfs: any[] = [];
  selectedPdf: any;

  constructor(private pdfService: PdfService,
              private formBuilder: FormBuilder) { }

  get debug() {return this.form};

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ["", Validators.required],
      senha: ["", Validators.required],
      nome: ["", Validators.required],
      telefone: ["", Validators.required]
    });
  }

  onFileSelected(target: any): void {
    target = target as EventTarget;

    let element = target as HTMLInputElement;
    let files = element.files;

    if (files) {
      this.selectedFile = files[0]
    }
  }

  onSubmit(): void {
    const pdfForm = new FormData();
    pdfForm.append('pdf', this.selectedFile);
    pdfForm.append('usuarioId', '1');

    this.pdfService.uploadPdf(pdfForm).subscribe(res => {
      console.log(res);
    });
  }

  //
  loadPdfs(): void {
    this.pdfService.getPdfs().subscribe({
      next: pdfs => {
        this.pdfs = pdfs;
        if (pdfs.length > 0) {
          this.selectedPdf = pdfs[0];
        }
      },
      error: (err) => {
        console.error('Error loading PDFs', err);
      }}
    );
  }

  onSelectPdf(pdf: any): void {
    this.selectedPdf = pdf;
  }

  cadastrarCliente() {

  }
}
