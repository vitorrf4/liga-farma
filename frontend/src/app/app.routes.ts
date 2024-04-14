import { Routes } from '@angular/router';
import {ListaVagasComponent} from "./components/geral/lista-vagas/lista-vagas.component";
import {CadastroComponent} from "./components/geral/cadastro/cadastro.component";
import {CadastroPessoaComponent} from "./components/pessoa/cadastro-pessoa/cadastro-pessoa.component";
import {CadastroEmpresaComponent} from "./components/empresa/cadastro-empresa/cadastro-empresa.component";
import {LoginComponent} from "./components/geral/login/login.component";
import {MeuPerfilComponent} from "./components/geral/meu-perfil/meu-perfil.component";
import {SobreNosComponent} from "./components/geral/sobre-nos/sobre-nos.component";
import {CandidaturaComponent} from "./components/pessoa/candidatura/candidatura.component";
import {MinhasVagasComponent} from "./components/empresa/minhas-vagas/minhas-vagas.component";
import {MinhasCandidaturasComponent} from "./components/pessoa/minhas-candidaturas/minhas-candidaturas.component";
import {CriarVagaComponent} from "./components/empresa/criar-vaga/criar-vaga.component";
import {EditarEmpresaComponent} from "./components/empresa/editar-empresa/editar-empresa.component";
import {EditarPessoaComponent} from "./components/pessoa/editar-pessoa/editar-pessoa.component";
import {authGuard} from "./misc/auth.guard";
import { HomeComponent } from './components/geral/home/home.component';
import {somentePessoaGuard} from "./misc/somente-pessoa.guard";
import {somenteEmpresaGuard} from "./misc/somente-empresa.guard";
import { ContatoComponent } from './components/geral/contato/contato.component';

export const routes: Routes = [
  {path: "", pathMatch: 'full', redirectTo: 'home'},
  {path: "login", component: LoginComponent},
  {path: "cadastro", component: CadastroComponent, children: [
      {path:'', redirectTo: 'pessoa', pathMatch: 'full',},
      {path:'pessoa', component: CadastroPessoaComponent},
      {path:'empresa', component: CadastroEmpresaComponent}
  ]},
  {path: 'home', component: HomeComponent},
  {path: "vagas", component: ListaVagasComponent},
  {path: "sobre-nos", component: SobreNosComponent},
  {path: "contato", component:ContatoComponent},
  {path: "perfil", component: MeuPerfilComponent, canActivate: [authGuard]},
  {path: "editar-e", component: EditarEmpresaComponent, canActivate: [authGuard, somenteEmpresaGuard]},
  {path: "editar-p", component: EditarPessoaComponent, canActivate: [authGuard, somentePessoaGuard]},
  {path: "minhas-vagas", component: MinhasVagasComponent, canActivate: [authGuard, somenteEmpresaGuard]},
  {path: "criar-vaga", component: CriarVagaComponent, canActivate: [authGuard, somenteEmpresaGuard]},
  {path: "candidatura", component: CandidaturaComponent, canActivate: [authGuard, somentePessoaGuard]},
  {path: "minhas-candidaturas", component: MinhasCandidaturasComponent, canActivate: [authGuard, somentePessoaGuard]},
  {path: "**", redirectTo: ''}
];
