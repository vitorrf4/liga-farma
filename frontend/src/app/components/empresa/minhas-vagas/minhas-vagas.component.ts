import {Component, OnInit} from '@angular/core';
import {VagaService} from "../../../services/vaga.service";
import {Vaga} from "../../../models/vaga";
import {AuthService} from "../../../services/auth.service";
import {Farmacia} from "../../../models/farmacia";
import {CurrencyPipe, DatePipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Candidatura} from "../../../models/candidatura";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-minhas-vagas',
  standalone: true,
	imports: [
		JsonPipe,
		NgForOf,
		DatePipe,
		NgIf,
		CurrencyPipe,
		RouterLink
	],
  templateUrl: './minhas-vagas.component.html',
  styleUrl: './minhas-vagas.component.css'
})
export class MinhasVagasComponent implements OnInit {
  vagas: Vaga[] = [];

  constructor(private vagaService: VagaService,
              private loginService: LoginService,
              private router: Router) {}

  ngOnInit(): void {
    const empresa = this.loginService.usuario?.informacoes as Farmacia;
    if (!empresa) {
      return;
    }

    this.vagaService.listarVagasPorEmpresa(empresa.id).subscribe(res => {
      this.vagas = res;
    });
  }

  async aceitarCandidatura(candidatura: Candidatura, vaga: Vaga) {
    await this.router.navigateByUrl('contrato', {
      state: {
        candidatura: candidatura,
        vaga: vaga
      }});
  }

  fecharVaga(vaga: Vaga) {
    vaga.status = 'FECHADA';
    this.vagaService.atualizar(vaga).subscribe(res => {
      console.log(res);
    });
  }

}
