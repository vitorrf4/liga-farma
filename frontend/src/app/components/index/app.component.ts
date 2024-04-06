import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ListaVagasComponent} from "../geral/lista-vagas/lista-vagas.component";
import {Usuario} from "../../models/usuario";
import {NgIf} from "@angular/common";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ListaVagasComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  usuario?: Usuario

  constructor(private loginService: LoginService) {
    if (loginService.estaLogado) {
      this.usuario = loginService.usuario;
      loginService.usuarioObservable.subscribe(res => {
        this.usuario = res;
      });
    }

  }

  logout() {
    this.loginService.logout();
  }
}
