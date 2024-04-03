import {Farmacia} from "../models/farmacia";
import {Farmaceutico} from "./farmaceutico";

export class Usuario {
  email = '';
  senha = '';
  tipo = '';
  informacoes?: Farmacia | Farmaceutico;
}
