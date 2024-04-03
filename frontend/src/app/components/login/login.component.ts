import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PdfService} from "../../services/pdf.service";
import {AuthService} from "../../services/auth.service";
import {Farmaceutico} from "../../models/farmaceutico";
import {Usuario} from "../../models/usuario";

@Component({
  selector: 'app-login',
  standalone: true,
	imports: [
		NgIf,
		PdfViewerModule,
		ReactiveFormsModule
	],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private cadastroService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ["", Validators.required],
      cpf: ["", Validators.required],
      crf: ["", Validators.required],
      email: ["", Validators.required],
      senha: ["", Validators.required],
      telefone: ["", Validators.required]
    });
  }

  logarCliente() {
    let usuario = new Usuario(
      this.form.get('email')!.value,
      this.form.get('senha')!.value,
      'PESSOA',
    );

    this.cadastroService.login(usuario).subscribe(res => {
      console.log(res);
    })
  }
}
