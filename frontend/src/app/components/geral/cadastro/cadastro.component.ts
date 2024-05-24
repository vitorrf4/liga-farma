import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgOptimizedImage
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

}
