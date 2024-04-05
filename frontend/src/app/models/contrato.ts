import {Candidatura} from "./candidatura";
import {Vaga} from "./vaga";

export class Contrato {
  id: number = 0;
  dataInicio: Date = new Date(Date.now());
  dataFim: Date = new Date();
  status: string = '';
  candidaturaId: number = 0;
  vagaId: number = 0;
  candidatura: Candidatura = new Candidatura();
  vaga: Vaga = new Vaga();
}
