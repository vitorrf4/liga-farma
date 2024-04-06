import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {AuthService} from "../../../services/auth.service";
import {Farmaceutico} from "../../../models/farmaceutico";
import {Usuario} from "../../../models/usuario";

@Component({
  selector: 'app-cadastro-empresa',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    PdfViewerModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-empresa.component.html',
  styleUrl: './cadastro-empresa.component.css'
})
export class CadastroEmpresaComponent implements OnInit {
  form!: FormGroup;

  constructor(private cadastroService: AuthService,
              private formBuilder: FormBuilder) {}


  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ["", Validators.required],
      cnpj: ["", Validators.required],
      endereco: ["", Validators.required],
      descricao: ["", Validators.required],
      email: ["", Validators.required],
      senha: ["", Validators.required],
      telefone: [""]
    });
  }

  cadastrarCliente() {
    let farmaceutico : Farmaceutico;
    farmaceutico = this.form.getRawValue();

    const usuario = new Usuario(
      'EMPRESA',
      farmaceutico
    );

    this.cadastroService.cadastrar(usuario).subscribe(res => {
      console.log(res);
    })
  }
}
