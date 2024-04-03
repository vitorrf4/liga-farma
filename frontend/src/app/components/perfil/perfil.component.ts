import { Component } from '@angular/core';
import {Usuario} from "../../models/usuario";
import {JsonPipe} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  usuario!: Usuario;

  constructor(private authService: AuthService) {
    this.usuario = authService.usuario;
  }
}
