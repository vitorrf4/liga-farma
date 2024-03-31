import { Component } from '@angular/core';

@Component({
  selector: 'app-vaga-component',
  standalone: true,
  imports: [],
  templateUrl: './vaga-component.component.html',
  styleUrl: './vaga-component.component.css'
})
export class VagaComponentComponent {

  id: number = 0;
  titulo: string = "";
  descricao: string = "";
  salario: number = 0.0;
  estado: string = "";
  cidade: string = "";
  quantidadeVagas: string = "";

  constructor(){}

  ngOnInit(): void {
      
  }
}
