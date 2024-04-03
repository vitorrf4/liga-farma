import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Vaga} from "../../../models/vaga";
import {DatePipe, NgIf} from "@angular/common";
import {Router} from "@angular/router";

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

  constructor(private router: Router) { }

  async irParaCandidatura() {
    await this.router.navigateByUrl('candidatura', {state: {vaga: this.vaga}});
  }

  deselecionarVaga() {
    this.vagaDeselecionadaEvent.emit();
  }
}
