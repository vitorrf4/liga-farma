import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-cadastro-empresa',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './cadastro-empresa.component.html',
  styleUrl: './cadastro-empresa.component.css'
})
export class CadastroEmpresaComponent {
  selectedFile!: File;

  constructor(private http: HttpClient) {}

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
}
