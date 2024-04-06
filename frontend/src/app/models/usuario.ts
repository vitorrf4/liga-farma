import {Farmacia} from "./farmacia";
import {Farmaceutico} from "./farmaceutico";

export class Usuario {
  tipo = '';
  informacoes: Farmacia | Farmaceutico;
  token: string = '';

  constructor(tipo: string, informacoes: Farmacia | Farmaceutico) {
    this.tipo = tipo;
    this.informacoes = informacoes;
  }
}
