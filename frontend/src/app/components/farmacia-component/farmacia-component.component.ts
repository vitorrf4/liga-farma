import { Component } from '@angular/core';

@Component({
  selector: 'app-farmacia-component',
  standalone: true,
  imports: [],
  templateUrl: './farmacia-component.component.html',
  styleUrl: './farmacia-component.component.css'
})
export class FarmaciaComponentComponent {

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
