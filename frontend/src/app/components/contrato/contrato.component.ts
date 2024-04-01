import { Component } from '@angular/core';

@Component({
  selector: 'app-contrato-component',
  standalone: true,
  imports: [],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.css'
})
export class ContratoComponent {

  id: number = 0;
  dataInicio: string = "";
  dataFim: string = "";

  constructor(){}

  ngOnInit(): void {

  }
}
