import { Injectable } from '@angular/core';
import {Usuario} from "../models/usuario";
import {Subject} from "rxjs";
import {Farmacia} from "../models/farmacia";
import {Farmaceutico} from "../models/farmaceutico";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Classe que envia automaticamente novos valores de usuario
  usuarioObservable = new Subject<Usuario | undefined>();
  usuario?: Usuario;

  constructor() {
    this.usuario = JSON.parse(sessionStorage.getItem("usuario")!) || undefined;
    this.usuarioObservable.next(this.usuario);
  }

  get estaLogado() {
    return this.usuario;
  }

  get authToken() {
    return this.usuario?.token;
  }

  atualizarInformacoes(entidade: Farmacia | Farmaceutico) {
    if (!this.usuario) return;

    this.usuario.informacoes = entidade;
    this.usuarioObservable.next(this.usuario);
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
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
