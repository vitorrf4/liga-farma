import { Injectable } from '@angular/core';
import {Usuario} from "../models/usuario";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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

  logout() {
    this.usuario = undefined;
    sessionStorage.removeItem('usuario');
    this.usuarioObservable.next(undefined);
  }
}
