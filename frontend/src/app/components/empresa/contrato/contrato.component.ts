import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Vaga} from "../../../models/vaga";
import {Candidatura} from "../../../models/candidatura";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-contrato',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.css'
})
export class ContratoComponent {
  vaga: Vaga;
  candidatura: Candidatura;

  constructor(private router: ActivatedRoute) {
    this.vaga = history.state.vaga;
    this.candidatura = history.state.candidatura;
  }
}
