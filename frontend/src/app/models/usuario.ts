import {Farmacia} from "./farmacia";
import {Farmaceutico} from "./farmaceutico";

export class Usuario {
  email = '';
  senha = '';
  tipo = '';
  entidadeId?: string;
  informacoes?: Farmacia | Farmaceutico;

  constructor(email: string, senha: string, tipo: string, informacoes?: Farmacia | Farmaceutico) {
    this.email = email;
    this.senha = senha;
    this.tipo = tipo;
    this.informacoes = informacoes;
  }
}
