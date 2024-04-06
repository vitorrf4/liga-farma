import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  urlBase = environment.urlApi;

  constructor(private http: HttpClient) { }

  getPdfByUsuarioId(userId: number) {
    return this.http.get<any>(`${this.urlBase}/pdf/${userId}`);
  }

  uploadPdf(pdf: FormData) {
    return this.http.post<{message: string}>(`${this.urlBase}/pdf/upload`, pdf);
  }
}
