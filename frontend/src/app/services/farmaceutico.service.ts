import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {Farmaceutico} from "../model/farmaceutico";

@Injectable({
  providedIn: 'root'
})
export class FarmaceuticoService {
  urlBase = environment.urlApi;
  farmaceuticoUrl = "farmaceutico";

  constructor(private http: HttpClient) { }

  listar(): Observable<Farmaceutico[]> {
    return this.http.get<Farmaceutico[]>(`${this.urlBase}/${this.farmaceuticoUrl}`);
  }
}
