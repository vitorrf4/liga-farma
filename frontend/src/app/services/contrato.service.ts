import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Contrato} from "../models/contrato";

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  urlBase = environment.urlApi;
  urlApi = 'contrato';

  constructor(private http: HttpClient) { }

  cadastrar(contrato: Contrato) {
    return this.http.post<Contrato>(`${this.urlBase}/${this.urlApi}`, contrato);
  }
}
