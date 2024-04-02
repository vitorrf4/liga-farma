import { Routes } from '@angular/router';
import {FarmaceuticoComponent} from "./components/farmaceutico/farmaceutico.component";
import {FarmaciaComponent} from "./components/farmacia/farmacia.component";
import {VagaComponent} from "./components/vaga/vaga.component";

export const routes: Routes = [
  {path: "farmaceutico", component: FarmaceuticoComponent},
  {path: "farmacia", component: FarmaciaComponent},
  {path: "vagas", component: VagaComponent},
];
