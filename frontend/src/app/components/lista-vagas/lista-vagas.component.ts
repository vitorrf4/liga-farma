import {Component, OnInit} from '@angular/core';
import {Vaga} from "../../models/vaga";
import {VagaService} from "../../services/vaga.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-lista-vagas',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './lista-vagas.component.html',
  styleUrl: './lista-vagas.component.css'
})
export class ListaVagasComponent implements OnInit {
  vagas: Vaga[] = [];

  constructor(private service: VagaService) { }

  ngOnInit() {
    this.service.listar().subscribe(res => {
      this.vagas = res;
    });
  }
}
