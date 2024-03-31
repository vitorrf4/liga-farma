import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-farmaceutico-component',
  standalone: true,
  imports: [],
  templateUrl: './farmaceutico-component.component.html',
  styleUrl: './farmaceutico-component.component.css'
})
export class FarmaceuticoComponentComponent implements OnInit {
  
  id: number = 0;
  nome: string = "";
  cpf: string = "";
  crf: string = "";
  telefone: string = "";
  especializacao: string = "";
  email: string = "";
  senha: string = "";


  constructor(){}

  ngOnInit(): void {
      
  }
}
