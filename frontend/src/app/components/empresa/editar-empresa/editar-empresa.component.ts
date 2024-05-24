import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Usuario} from "../../../models/usuario";
import {LoginService} from "../../../services/login.service";
import {Farmacia} from "../../../models/farmacia";
import {FarmaciaService} from "../../../services/farmacia.service";
import {Router} from "@angular/router";
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-editar-empresa',
  standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
    NgxMaskDirective
	],
  templateUrl: './editar-empresa.component.html',
  styleUrl: './editar-empresa.component.css'
})
export class EditarEmpresaComponent implements OnInit {
  form!: FormGroup;
  empresa!: Farmacia;

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder,
              private farmaciaService: FarmaciaService,
              private rotuer: Router) {}

  ngOnInit() {
    this.empresa = this.loginService.usuario!.informacoes as Farmacia;

    this.form = this.formBuilder.group({
      id: [this.empresa.id],
      nome: [this.empresa.nome, Validators.required],
      cnpj: [this.empresa.cnpj, Validators.required],
      endereco: [this.empresa.endereco, Validators.required],
      descricao: [this.empresa.descricao, Validators.required],
      email: [this.empresa.email, Validators.required],
      telefone: [this.empresa.telefone]
    });
  }

  atualizarInformacoes() {
    const farmacia = this.form.getRawValue();

    this.farmaciaService.atualizar(farmacia).subscribe({
      next: async () => {
        const usuario = new Usuario('EMPRESA', farmacia);
        this.loginService.atualizarInformacoes(usuario.informacoes);
        await this.rotuer.navigateByUrl('/perfil');
      },
      error: err => {
        console.log(err)
      }
    });
  }
}
