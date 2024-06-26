import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Vaga} from "../models/vaga";

@Injectable({
  providedIn: 'root'
})
export class VagaService {
  urlBase = environment.urlApi;
  urlVaga = 'vaga';

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Vaga[]>(`${this.urlBase}/${this.urlVaga}`);
  }

  listarVagasPorEmpresa(empresaId: number) {
    return this.http.get<Vaga[]>(`${this.urlBase}/${this.urlVaga}/empresa/${empresaId}`);
  }

  cadastrar(vaga: Vaga) {
    return this.http.post<Vaga>(`${this.urlBase}/${this.urlVaga}`, vaga);
  }

  atualizarStatus(vaga: {id: number, status: string}) {
    return this.http.put(`${this.urlBase}/${this.urlVaga}/status`, vaga);
  }
}
