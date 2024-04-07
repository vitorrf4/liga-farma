import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { Usuario } from '../../../models/usuario';
import {Vaga} from "../../../models/vaga";
import {VagaService} from "../../../services/vaga.service";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgForOf,
    NgIf,
    SlicePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  usuario?: Usuario

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
