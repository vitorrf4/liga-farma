import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {PdfService} from "../../services/pdf.service";
import {NgForOf, NgIf} from "@angular/common";
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {PdfViewerModule} from "ng2-pdf-viewer";

@Component({
  selector: 'app-cadastro-empresa',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgxExtendedPdfViewerModule,
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
    // Replace '1' with the actual user ID
    this.loadPdfs();
  }

  onFileSelected(target: any): void {
    if(target instanceof EventTarget) {
      let element = target as HTMLInputElement;
      let files = element.files;

      if (files) {
        this.selectedFile = files[0]
        console.log(this.selectedFile);
      } else {
        console.log('no files');
      }
    } else {
      console.log('not target');
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('pdf', this.selectedFile);
    formData.append('userId', '1'); // Sample user ID, replace with actual user ID

    this.http.post<any>('http://localhost:3000/upload', formData).subscribe(res => {
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
            console.log(this.selectedPdf.data);
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
