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
import {ContratoComponent} from "./components/empresa/contrato/contrato.component";
import {MinhasCandidaturasComponent} from "./components/pessoa/minhas-candidaturas/minhas-candidaturas.component";
import {CriarVagaComponent} from "./components/empresa/criar-vaga/criar-vaga.component";
import {EditarEmpresaComponent} from "./components/empresa/editar-empresa/editar-empresa.component";
import {EditarPessoaComponent} from "./components/pessoa/editar-pessoa/editar-pessoa.component";
import { HomeComponent } from './components/geral/home/home.component';

export const routes: Routes = [
  {path: "vagas", component: ListaVagasComponent},
  {path: "perfil", component: MeuPerfilComponent},
  {path: "editar-e", component: EditarEmpresaComponent},
  {path: "editar-p", component: EditarPessoaComponent},
  {path: "sobre-nos", component: SobreNosComponent},
  {path: "candidatura", component: CandidaturaComponent},
  {path: "contrato", component: ContratoComponent},
  {path: "minhas-vagas", component: MinhasVagasComponent},
  {path: "criar-vaga", component: CriarVagaComponent},
  {path: "minhas-candidaturas", component: MinhasCandidaturasComponent},
  {path: "login", component: LoginComponent},
  {path: "cadastro", component: CadastroComponent, children: [
      {path:'pessoa', component: CadastroPessoaComponent},
      {path:'empresa', component: CadastroEmpresaComponent}
  ]},
  {path: 'home', component: HomeComponent}
];
