import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-cadastro-farmaceutico',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './cadastro-pessoa.component.html',
  styleUrl: './cadastro-pessoa.component.css'
})
export class CadastroPessoaComponent {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  get debug() {return this.form.invalid};

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ["", Validators.required],
      senha: ["", Validators.required],
      nome: ["", Validators.required],
      telefone: ["", Validators.required],
      endereco: this.formBuilder.group({
        rua: ["", Validators.required],
        numero: ["", Validators.required],
        cep: ["", Validators.required],
        complemento: [""],
        regiao: this.formBuilder.group({
          nome: ["", Validators.required]
        })
      })
    });
  }

  cadastrarCliente() {

  }
}
