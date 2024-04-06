import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../models/usuario";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.urlApi;
  private apiUrl = 'auth';
  usuario?: Usuario;
  // Classe que envia automaticamente os novos valores de usuario
  usuarioObservable = new Subject<Usuario | undefined>();

  constructor(private http: HttpClient) {
    this.usuario = JSON.parse(sessionStorage.getItem("usuario")!) || undefined;
    if (this.usuario) {
      this.usuarioObservable.next(this.usuario);
    }
  }

  get authToken() {
    return this.usuario?.token;
  }

  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
    this.usuarioObservable.next(usuario);
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
  }

  cadastrar(usuario: Usuario) {
    return this.http.post<Usuario>(`${this.baseUrl}/${this.apiUrl}/cadastro`, usuario);
  }

  login(usuario: {email: string, senha: string}) {
    return this.http.post<Usuario>(`${this.baseUrl}/${this.apiUrl}/login`, usuario);
  }

  logout() {
    this.usuario = undefined;
    sessionStorage.removeItem('usuario');
    this.usuarioObservable.next(undefined);
  }
}
