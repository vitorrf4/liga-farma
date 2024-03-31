import { Component } from '@angular/core';

@Component({
  selector: 'app-contrato-component',
  standalone: true,
  imports: [],
  templateUrl: './contrato-component.component.html',
  styleUrl: './contrato-component.component.css'
})
export class ContratoComponentComponent {

  id: number = 0;
  dataInicio: string = "";
  dataFim: string = "";

  constructor(){}

  ngOnInit(): void {
      
  }
}
