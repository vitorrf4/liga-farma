import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Farmacia} from "../../../models/farmacia";
import {VagaService} from "../../../services/vaga.service";

@Component({
  selector: 'app-criar-vaga',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './criar-vaga.component.html',
  styleUrl: './criar-vaga.component.css'
})
export class CriarVagaComponent implements OnInit {
  vagaForm!: FormGroup;

  constructor(private builder: FormBuilder,
              private authService: AuthService,
              private vagaService: VagaService) { }

  ngOnInit(): void {
    const farmacia = this.authService.usuario?.informacoes as Farmacia;

    this.vagaForm = this.builder.group({
      farmaciaId: farmacia.id,
      titulo: [''],
      estado: [''],
      cidade: [''],
      quantidadeVagas: [1],
      descricao: [''],
      turno: [''],
      salario: [0],
      tipo: [''],
    });
  }

  criarVaga() {
    const vaga = this.vagaForm.getRawValue();

    this.vagaService.cadastrar(vaga).subscribe(res => {
      console.log(res);
    });
  }
}
