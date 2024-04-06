import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {FarmaceuticoService} from "../../../services/farmaceutico.service";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";

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
              private loginService: LoginService,
              private formBuilder: FormBuilder,
              private router: Router) { }

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
      next: async res => {
        this.loginService.setUsuario(res);
        await this.router.navigateByUrl('/perfil');
      },
      error: err => { console.log(err) }
    })
  }
}
