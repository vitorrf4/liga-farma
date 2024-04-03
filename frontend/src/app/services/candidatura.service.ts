import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Farmaceutico} from "../models/farmaceutico";

@Injectable({
  providedIn: 'root'
})
export class CandidaturaService {
  urlBase = environment.urlApi;
  candidaturaUrl = "candidatura";

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Farmaceutico[]>(`${this.urlBase}/${this.candidaturaUrl}`);
  }
}
