import {Farmacia} from "./farmacia";
import {Candidatura} from "./candidatura";

export class Vaga {
  id: number = 0;
  titulo: string = "";
  descricao: string = "";
  salario: number = 0;
  estado: string = "";
  cidade: string = "";
  tipo: string = "";
  turno: string = "";
  status: string = '';
  dataPublicada!: Date;
  farmacia: Farmacia = new Farmacia();
  candidaturas: Candidatura[] = [];
}
