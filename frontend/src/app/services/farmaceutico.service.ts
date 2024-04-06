import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Farmaceutico} from "../models/farmaceutico";

@Injectable({
  providedIn: 'root'
})
export class FarmaceuticoService {
  urlBase = environment.urlApi;
  farmaceuticoUrl = "farmaceutico";

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Farmaceutico[]>(`${this.urlBase}/${this.farmaceuticoUrl}`);
  }

  getById(id: string) {
    return this.http.get<Farmaceutico>(`${this.urlBase}/${this.farmaceuticoUrl}/${id}`);
  }

  cadastrar(farmaceutico: Farmaceutico) {
    return this.http.post<Farmaceutico>(`${this.urlBase}/${this.farmaceuticoUrl}`, farmaceutico);
  }

  atualizar(farmaceutico: Farmaceutico) {
    return this.http.put(`${this.urlBase}/${this.farmaceuticoUrl}`, farmaceutico);
  }
}
