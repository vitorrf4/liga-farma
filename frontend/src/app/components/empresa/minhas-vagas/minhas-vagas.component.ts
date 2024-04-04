import {Component, OnInit} from '@angular/core';
import {VagaService} from "../../../services/vaga.service";
import {Vaga} from "../../../models/vaga";
import {AuthService} from "../../../services/auth.service";
import {Farmacia} from "../../../models/farmacia";
import {DatePipe, JsonPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-minhas-vagas',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf,
    DatePipe
  ],
  templateUrl: './minhas-vagas.component.html',
  styleUrl: './minhas-vagas.component.css'
})
export class MinhasVagasComponent implements OnInit {
  vagas: Vaga[] = [];

  constructor(private vagaService: VagaService,
              private authService: AuthService) {}

  ngOnInit(): void {
    const empresa = this.authService.usuario?.informacoes as Farmacia;
    if (!empresa) {
      return;
    }

    this.vagaService.listarVagasPorEmpresa(empresa.id).subscribe(res => {
      this.vagas = res;
    });
  }


}
