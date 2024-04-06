import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Farmaceutico} from "../models/farmaceutico";
import {Farmacia} from "../models/farmacia";

@Injectable({
  providedIn: 'root'
})
export class FarmaciaService {
  urlBase = environment.urlApi;
  urlApi = "farmacia";

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Farmacia[]>(`${this.urlBase}/${this.urlApi}`);
  }

  getById(id: string) {
    return this.http.get<Farmacia>(`${this.urlBase}/${this.urlApi}/${id}`);
  }

  cadastrar(farmacia: Farmacia) {
    return this.http.post<Farmacia>(`${this.urlBase}/${this.urlApi}`, farmacia);
  }

  atualizar(farmacia: Farmacia) {
    return this.http.put(`${this.urlBase}/${this.urlApi}`, farmacia);
  }
}
