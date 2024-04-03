import {Farmacia} from "./farmacia";

export class Vaga {
  id: number = 0;
  titulo: string = "";
  descricao: string = "";
  salario: number = 0;
  estado: string = "";
  cidade: string = "";
  quantidadeVagas: number = 0;
  tipo: string = "";
  turno: string = "";
  dataPublicada!: Date;
  farmacia: Farmacia = new Farmacia();
}
