import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Vaga} from "../../../models/vaga";
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../../../services/login.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {Usuario} from "../../../models/usuario";

@Component({
  selector: 'app-vaga-pagina',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './vaga-pagina.component.html',
  styleUrl: './vaga-pagina.component.css'
})
export class VagaPaginaComponent {
  @Input() vaga: Vaga | null = null;
  @Output() vagaDeselecionadaEvent = new EventEmitter();
  usuario?: Usuario;

  constructor(private router: Router,
              loginService: LoginService) {
    this.usuario = loginService.usuario;
  }

  get jaCandidadato() {
    const id = this.usuario?.informacoes.id;
    let estaCandidato = false;

    this.vaga?.candidaturas.forEach(c => {
      if (c.farmaceuticoId === id) {
        estaCandidato = true;
      }
    });

    return estaCandidato;
  }

  async irParaCandidatura() {
    await this.router.navigateByUrl('candidatura', {state: {vaga: this.vaga}});
  }

  deselecionarVaga() {
    this.vagaDeselecionadaEvent.emit();
  }
}
