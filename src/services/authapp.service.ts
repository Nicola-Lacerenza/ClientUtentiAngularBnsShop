import { Injectable } from '@angular/core';
import { user } from '../app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  private login : user;

  constructor() { 
    this.login=user.getInstance();
  }
   
  autentica = (userid:string, password:string) : boolean =>{
    var retVal = (userid === 'Nicola' && password === '123')? true : false;
       
  if (retVal){
      sessionStorage.setItem("Utente",userid);
    }

   return retVal;
  }

  loggedUser = () : string | null => this.login.loggedUser();

  isLogged = () : boolean => this.login.isLogged();

  clearUser = () : void => this.login.clearUser();

  clearAll = () : void => this.login.clearAll();

}
