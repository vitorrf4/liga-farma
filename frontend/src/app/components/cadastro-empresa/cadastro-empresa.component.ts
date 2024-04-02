import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {PdfService} from "../../services/pdf.service";
import {NgForOf, NgIf} from "@angular/common";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {Pdf} from "../../model/pdf";

@Component({
  selector: 'app-cadastro-empresa',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    PdfViewerModule
  ],
  templateUrl: './cadastro-empresa.component.html',
  styleUrl: './cadastro-empresa.component.css'
})
export class CadastroEmpresaComponent implements OnInit {
  selectedFile!: File;
  pdfs: any[] = [];
  selectedPdf: any;

  constructor(private http: HttpClient,
              private pdfService: PdfService) {}

  ngOnInit(): void {
    this.loadPdfs();
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
            this.selectedPdf = pdfs[0]; // Select the first PDF by default
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
}
