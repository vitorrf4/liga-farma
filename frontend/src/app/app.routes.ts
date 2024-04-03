import { Routes } from '@angular/router';
import {FarmaceuticoComponent} from "./components/farmaceutico/farmaceutico.component";
import {FarmaciaComponent} from "./components/farmacia/farmacia.component";
import {ListaVagasComponent} from "./components/lista-vagas/lista-vagas.component";
import {CadastroComponent} from "./components/cadastro/cadastro.component";
import {CadastroPessoaComponent} from "./components/cadastro-pessoa/cadastro-pessoa.component";
import {CadastroEmpresaComponent} from "./components/cadastro-empresa/cadastro-empresa.component";
import {LoginComponent} from "./components/login/login.component";

export const routes: Routes = [
  {path: "farmaceutico", component: FarmaceuticoComponent},
  {path: "farmacia", component: FarmaciaComponent},
  {path: "vagas", component: ListaVagasComponent},
  {path: "login", component: LoginComponent},
  {path: "cadastro", component: CadastroComponent,
    children: [
      {path:'pessoa', component: CadastroPessoaComponent},
      {path:'empresa', component: CadastroEmpresaComponent}]
  },
];
