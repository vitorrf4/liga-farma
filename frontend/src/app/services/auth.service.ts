import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../model/usuario";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.urlApi;
  apiUrl = 'auth';

  constructor(private http: HttpClient) { }

  cadastrar(usuario: Usuario) {
    return this.http.post(`${this.baseUrl}/${this.apiUrl}/cadastro`, usuario);
  }

  login(usuario: Usuario) {
    return this.http.post(`${this.baseUrl}/${this.apiUrl}/login`, usuario);
  }
}
