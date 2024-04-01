import { Component, OnInit } from '@angular/core';
import {FarmaceuticoService} from "../../services/farmaceutico.service";
import {Farmaceutico} from "../../model/farmaceutico";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-farmaceutico-component',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './farmaceutico.component.html',
  styleUrl: './farmaceutico.component.css'
})
export class FarmaceuticoComponent implements OnInit {
  farmaceuticos: Farmaceutico[] = [];

  constructor(private service: FarmaceuticoService){}

  ngOnInit(): void {
    this.service.listar().subscribe(res => {
      this.farmaceuticos = res;
    });
  }
}
