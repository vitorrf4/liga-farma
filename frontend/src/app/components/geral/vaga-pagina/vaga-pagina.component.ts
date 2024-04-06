import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Vaga} from "../../../models/vaga";
import {DatePipe, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {LoginService} from "../../../services/login.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-vaga-pagina',
  standalone: true,
  imports: [
    NgIf,
    DatePipe
  ],
  templateUrl: './vaga-pagina.component.html',
  styleUrl: './vaga-pagina.component.css'
})
export class VagaPaginaComponent {
  @Input() vaga: Vaga | null = null;
  @Output() vagaDeselecionadaEvent = new EventEmitter();
  tipo: string | undefined = '';

  constructor(private router: Router,
              loginService: LoginService) {
    this.tipo = loginService.usuario?.tipo;
  }

  get isPessoa() {
    return this.tipo === 'PESSOA';
  }

  async irParaCandidatura() {
    await this.router.navigateByUrl('candidatura', {state: {vaga: this.vaga}});
  }

  deselecionarVaga() {
    this.vagaDeselecionadaEvent.emit();
  }
}
