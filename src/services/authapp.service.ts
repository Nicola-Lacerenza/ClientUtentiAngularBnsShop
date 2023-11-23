import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  constructor() { }

  autentica = (userid:string, password:string) : boolean =>{
      return(userid === 'Nicola' && password === '123')? true : false;
  }
}
