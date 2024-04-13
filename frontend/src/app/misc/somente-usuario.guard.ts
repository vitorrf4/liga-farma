import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "../services/login.service";

export const somenteUsuarioGuard: CanActivateFn = (route, state) => {
  const usuario = inject(LoginService).usuario
  const router = inject(Router);

  if (usuario?.tipo != 'PESSOA') {
    alert('Somente para indivíduos');
    return false
  }

  return true;
};
