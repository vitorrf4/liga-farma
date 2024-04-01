import { Component } from '@angular/core';

@Component({
  selector: 'app-vaga-component',
  standalone: true,
  imports: [],
  templateUrl: './vaga.component.html',
  styleUrl: './vaga.component.css'
})
export class VagaComponent {

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
