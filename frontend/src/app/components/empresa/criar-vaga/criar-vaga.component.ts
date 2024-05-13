import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Farmacia} from "../../../models/farmacia";
import {VagaService} from "../../../services/vaga.service";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-criar-vaga',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './criar-vaga.component.html',
  styleUrl: './criar-vaga.component.css'
})
export class CriarVagaComponent implements OnInit {
  vagaForm!: FormGroup;

  constructor(private builder: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private vagaService: VagaService) { }

  ngOnInit(): void {
    const farmacia = this.loginService.usuario?.informacoes as Farmacia;

    this.vagaForm = this.builder.group({
      farmaciaId: farmacia.id,
      titulo: ['', Validators.required],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      quantidadeVagas: [1, Validators.required],
      descricao: ['', Validators.required],
      turno: ['', Validators.required],
      salario: [0, Validators.required],
      tipo: ['', Validators.required],
    });
  }

  get tipoVagas() {
    return ['Temporário', 'CLT', 'PJ'];
  }

  criarVaga() {
    if (!this.vagaEstaValida()) {
      return;
    }

    const vaga = this.vagaForm.value;
    this.vagaService.cadastrar(vaga).subscribe({
      next: async () => {
        alert("Vaga criada com sucesso");
        await this.router.navigateByUrl('/perfil');
      },
      error: () => {
        alert('Erro no sistema, tente novamente mais tarde');
      }
    });
  }

  vagaEstaValida() {
    if (this.vagaForm.invalid) {
      alert('Todos os campos devem ser preenchidos');
      return false;
    }

    const form = this.vagaForm.value;
    if (form.quantidadeVagas <= 0) {
      alert('A quantidade de vagas deve ser maior que 0');
      return false;
    }

    if (form.salario <= 0 || form.quantidadeVagas <= 0) {
      alert('Salário deve ser maior que zero');
      return false;
    }

    return true;
  }

}
