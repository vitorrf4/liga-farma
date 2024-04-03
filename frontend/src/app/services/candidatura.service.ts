import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Candidatura} from "../models/candidatura";

@Injectable({
  providedIn: 'root'
})
export class CandidaturaService {
  urlBase = environment.urlApi;
  candidaturaUrl = "candidatura";

  constructor(private http: HttpClient) { }

  cadastrar(candidatura: Candidatura) {
    return this.http.post<Candidatura>(`${this.urlBase}/${this.candidaturaUrl}`, candidatura);
  }
}
