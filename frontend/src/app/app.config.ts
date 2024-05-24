import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {JwtInterceptor} from "./misc/jwt.interceptor";
import { provideNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideNgxMask(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(
      withInterceptors([JwtInterceptor])
    )
  ]
};
