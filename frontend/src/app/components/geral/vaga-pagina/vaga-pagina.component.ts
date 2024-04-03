import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Vaga} from "../../../models/vaga";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-vaga-pagina',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './vaga-pagina.component.html',
  styleUrl: './vaga-pagina.component.css'
})
export class VagaPaginaComponent {
  @Input() vaga: Vaga | null = null;
  @Output() vagaDeselecionadaEvent = new EventEmitter();

  deselecionarVaga() {
    this.vagaDeselecionadaEvent.emit();
  }
}
