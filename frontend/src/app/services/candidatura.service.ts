import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Candidatura} from "../models/candidatura";

@Injectable({
  providedIn: 'root'
})
export class CandidaturaService {
  urlBase = environment.urlApi;
  candidaturaUrl = "candidatura";

  constructor(private http: HttpClient) { }

  listarPorPessoaId(pessoaId: number) {
    return this.http.get<Candidatura[]>(`${this.urlBase}/${this.candidaturaUrl}/pessoa/${pessoaId}`);
  }

  cadastrar(candidatura: Candidatura) {
    return this.http.post<Candidatura>(`${this.urlBase}/${this.candidaturaUrl}`, candidatura);
  }
}
