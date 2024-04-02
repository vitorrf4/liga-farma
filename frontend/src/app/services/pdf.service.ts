import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  apiUrl = environment.urlApi;

  constructor(private http: HttpClient) { }

  getPdfs() {
    return this.http.get<any>(`${this.apiUrl}/pdfs`,
      { headers: {responseType: 'arrayBuffer'}});
  }

  getPdf(userId: string) {
    return this.http.get<any>(`${this.apiUrl}/pdfs/${userId}`);
  }
}
