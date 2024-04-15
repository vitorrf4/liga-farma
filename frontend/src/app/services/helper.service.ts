import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getStringComPrimeiraMaiuscula(str: string) {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
