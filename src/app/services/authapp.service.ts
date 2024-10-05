import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';
import { UserRegister } from '../models/UserRegister.interface';
import { UserLogin } from '../models/UserLogin.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  constructor(private httprequest:HttpRequestService) { 
  
  }

  public doLogin(body:UserLogin):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/LoginServlet",body);
  }

  public isLogged():boolean{
    return localStorage.getItem("token")===undefined;
  }
  
  public doLogout():void{
    localStorage.removeItem("token");
  }

  public doRegister(body:UserRegister):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/RegisterServlet",body);
  }

}
