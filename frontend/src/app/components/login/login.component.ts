import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PdfService} from "../../services/pdf.service";
import {AuthService} from "../../services/auth.service";
import {Farmaceutico} from "../../models/farmaceutico";
import {Usuario} from "../../models/usuario";
import {FarmaceuticoService} from "../../services/farmaceutico.service";

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

  constructor(private authService: AuthService,
              private farmaceuticoService: FarmaceuticoService,
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
    let usuario = {
      email: this.form.get('email')!.value,
      senha: this.form.get('senha')!.value,
    }

    this.authService.login(usuario).subscribe({
      next: res => {
        this.authService.setUsuario(res);
        console.log('login success');
      },
      error: err => { console.log("erro login") }
    })
  }
}
