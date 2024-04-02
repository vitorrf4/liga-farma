import { Routes } from '@angular/router';
import {FarmaceuticoComponent} from "./components/farmaceutico/farmaceutico.component";
import {FarmaciaComponent} from "./components/farmacia/farmacia.component";
import {ListaVagasComponent} from "./components/lista-vagas/lista-vagas.component";

export const routes: Routes = [
  {path: "farmaceutico", component: FarmaceuticoComponent},
  {path: "farmacia", component: FarmaciaComponent},
  {path: "vagas", component: ListaVagasComponent},
];
