import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {JwtInterceptor} from "./misc/jwt.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // import da classe que fará as chamadas http
    importProvidersFrom(HttpClientModule),
    provideHttpClient(
      withInterceptors([JwtInterceptor])
    )
  ]
};
