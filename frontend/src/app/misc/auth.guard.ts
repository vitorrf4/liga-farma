import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "../services/login.service";

export const authGuard: CanActivateFn = async (route, state) => {
    const estaLogado = inject(LoginService).estaLogado
    const router = inject(Router);
    if (estaLogado) {
      return true;
    }

    await router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
};
