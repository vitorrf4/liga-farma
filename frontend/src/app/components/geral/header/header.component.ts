import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { ListaVagasComponent } from '../lista-vagas/lista-vagas.component';
import { Usuario } from '../../../models/usuario';
import {NgIf, NgOptimizedImage} from "@angular/common";
import { LoginService } from '../../../services/login.service';
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterOutlet,
    ListaVagasComponent,
    RouterLink,
    NgIf,
    FooterComponent,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  usuario?: Usuario

  constructor(private loginService: LoginService,
              private router: Router) {
    this.usuario = loginService.usuario;

    loginService.usuarioObservable.subscribe(res => {
      this.usuario = res;
    });
  }

  async logout() {
    this.loginService.logout();
    await this.router.navigateByUrl('/home');
  }

}
