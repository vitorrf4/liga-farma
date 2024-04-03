import { Routes } from '@angular/router';
import {ListaVagasComponent} from "./components/geral/lista-vagas/lista-vagas.component";
import {CadastroComponent} from "./components/geral/cadastro/cadastro.component";
import {CadastroPessoaComponent} from "./components/pessoa/cadastro-pessoa/cadastro-pessoa.component";
import {CadastroEmpresaComponent} from "./components/empresa/cadastro-empresa/cadastro-empresa.component";
import {LoginComponent} from "./components/geral/login/login.component";
import {PerfilPessoaComponent} from "./components/pessoa/perfil-pessoa/perfil-pessoa.component";

export const routes: Routes = [
  {path: "vagas", component: ListaVagasComponent},
  {path: "perfil", component: PerfilPessoaComponent},
  {path: "login", component: LoginComponent},
  {path: "cadastro", component: CadastroComponent, children: [
      {path:'pessoa', component: CadastroPessoaComponent},
      {path:'empresa', component: CadastroEmpresaComponent}
  ]},
];
