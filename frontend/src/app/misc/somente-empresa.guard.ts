import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "../services/login.service";

export const somenteEmpresaGuard: CanActivateFn = (route, state) => {
  const usuario = inject(LoginService).usuario

  if (usuario?.tipo != 'EMPRESA') {
    alert('Funcionalidade disponivel somente para empresas');
    return false
  }

  return true;
};
