import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "../services/login.service";

export const somentePessoaGuard: CanActivateFn = (route, state) => {
  const usuario = inject(LoginService).usuario

  if (usuario?.tipo != 'PESSOA') {
    alert('Funcionalidade disponivel somente para indivíduos');
    return false
  }

  return true;
};
