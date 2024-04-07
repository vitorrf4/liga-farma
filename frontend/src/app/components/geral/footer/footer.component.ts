import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  usuario?: Usuario

}
