import {Component, OnInit} from '@angular/core';
import {Vaga} from "../../../models/vaga";
import {VagaService} from "../../../services/vaga.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {VagaPaginaComponent} from "../vaga-pagina/vaga-pagina.component";

@Component({
  selector: 'app-lista-vagas',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    VagaPaginaComponent,
    NgIf
  ],
  templateUrl: './lista-vagas.component.html',
  styleUrl: './lista-vagas.component.css'
})
export class ListaVagasComponent implements OnInit {
  vagas: Vaga[] = [];
  vagaSelecionada: Vaga | null = null;

  constructor(private service: VagaService) { }

  ngOnInit() {
    this.service.listar().subscribe(res => {
      this.vagas = res;
    });
  }

  mudarVagaSelecionada(vaga: Vaga | null) {
    this.vagaSelecionada = vaga;
  }
}
