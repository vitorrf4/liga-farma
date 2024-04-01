import { Component } from '@angular/core';

@Component({
  selector: 'app-farmacia-component',
  standalone: true,
  imports: [],
  templateUrl: './farmacia.component.html',
  styleUrl: './farmacia.component.css'
})
export class FarmaciaComponent {

  id: number = 0;
  nome: string = "";
  cnpj: string = "";
  endereco: string = "";
  email: string = "";
  senha: string = "";
  telefone: string = "";


  constructor(){}

  ngOnInit(): void {

  }
}
