import { Routes } from '@angular/router';
import {ListaVagasComponent} from "./components/geral/lista-vagas/lista-vagas.component";
import {CadastroComponent} from "./components/geral/cadastro/cadastro.component";
import {CadastroPessoaComponent} from "./components/pessoa/cadastro-pessoa/cadastro-pessoa.component";
import {CadastroEmpresaComponent} from "./components/empresa/cadastro-empresa/cadastro-empresa.component";
import {LoginComponent} from "./components/geral/login/login.component";
import {MeuPerfilComponent} from "./components/geral/meu-perfil/meu-perfil.component";
import {SobreNosComponent} from "./components/sobre-nos/sobre-nos.component";
import {CandidaturaComponent} from "./components/pessoa/candidatura/candidatura.component";
import {MinhasVagasComponent} from "./components/empresa/minhas-vagas/minhas-vagas.component";

export const routes: Routes = [
  {path: "vagas", component: ListaVagasComponent},
  {path: "perfil", component: MeuPerfilComponent},
  {path: "sobre-nos", component: SobreNosComponent},
  {path: "candidatura", component: CandidaturaComponent},
  {path: "minhas-vagas", component: MinhasVagasComponent},
  {path: "login", component: LoginComponent},
  {path: "cadastro", component: CadastroComponent, children: [
      {path:'pessoa', component: CadastroPessoaComponent},
      {path:'empresa', component: CadastroEmpresaComponent}
  ]},
];
