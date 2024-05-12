import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

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
    return this.http.post<{curriculoId: string}>(`${this.urlBase}/pdf/upload`, pdf);
  }
}
