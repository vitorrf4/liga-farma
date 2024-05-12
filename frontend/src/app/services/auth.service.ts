import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../models/usuario";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.urlApi;
  private apiUrl = 'auth';

  constructor(private http: HttpClient) { }

  cadastrar(usuario: Usuario) {
    return this.http.post<Usuario>(`${this.baseUrl}/${this.apiUrl}/cadastro`, usuario);
  }

  login(usuario: {email: string, senha: string}) {
    return this.http.post<Usuario>(`${this.baseUrl}/${this.apiUrl}/login`, usuario);
  }

  enviarEmailRedefinicao(usuario: {email: string}) {
    return this.http.post(`${this.baseUrl}/${this.apiUrl}/reset-link`, usuario);
  }

  redefinirSenha(usuario: {token: string, id: string, senha: string}) {
    return this.http.post(`${this.baseUrl}/${this.apiUrl}/reset`, usuario);
  }
}
