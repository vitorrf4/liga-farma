import {Farmaceutico} from "./farmaceutico";
import {Vaga} from "./vaga";
import {Contrato} from "./contrato";

export class Candidatura {
  id = 0;
  vaga: Vaga = new Vaga();
  farmaceutico = new Farmaceutico();
  contrato?: Contrato;
  mensagem = '';
}
