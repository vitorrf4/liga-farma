import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  urlBase = environment.urlApi;
  urlApi = 'contato';

  constructor(private http: HttpClient) { }

  enviarMensagem(mensagem: Object) {
    return this.http.post(`${this.urlBase}/${this.urlApi}`, mensagem);
  }
}
