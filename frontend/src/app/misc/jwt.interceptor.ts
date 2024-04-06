import {HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {LoginService} from "../services/login.service";

// Função que intercepta todas as requisições e adiciona o token de autorização
export function JwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const token = inject(LoginService).authToken;

  // Se o token existir, adiciona no header da requisição
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Passa a requisição para a próxima função
  return next(req);
}
