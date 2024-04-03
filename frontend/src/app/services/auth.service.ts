import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../models/usuario";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.urlApi;
  apiUrl = 'auth';
  usuario!: Usuario;

  constructor(private http: HttpClient) { }

  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
  }

  cadastrar(usuario: Usuario) {
    return this.http.post<Object>(`${this.baseUrl}/${this.apiUrl}/cadastro`, usuario);
  }

  login(usuario: Usuario) {
    return this.http.post<Usuario>(`${this.baseUrl}/${this.apiUrl}/login`, usuario);
  }
}
