import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { HttpRequestService } from './http-request.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  //private login : user;

  constructor(private httprequest:HttpRequestService) { 
  //  this.login=user.getInstance();
  }
   
  /*autentica = (userid:string, password:string) : boolean =>{
    var retVal = (userid === 'Nicola' && password === '123')? true : false;
       
  if (retVal){
      sessionStorage.setItem("Utente",userid);
    }

   return retVal;
  }*/

  public doLogin(body:any):Observable<any>{
    return this.httprequest.postRequest(environment.serverUrl + "/LoginServlet",body);
  }

  public isLogged():boolean{
    return localStorage.getItem("token")===undefined;
  }
  
  public doLogout():void{
    localStorage.removeItem("token");
  }

  public doRegister(body:any):Observable<any>{
    return this.httprequest.postRequest(environment.serverUrl + "/RegisterServlet",body);
  }

  //loggedUser = () : string | null => this.login.loggedUser();

  //isLogged = () : boolean => this.login.isLogged();

  //clearUser = () : void => this.login.clearUser();

  //clearAll = () : void => this.login.clearAll();

}
