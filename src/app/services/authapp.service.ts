import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';
import { Router } from '@angular/router';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  constructor(
    private httprequest:HttpRequestService,
    private router:Router
    ){ }

  public doLogin(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/LoginServlet",body);
  }

  public isLogged():boolean{
    if(localStorage.getItem("token") && localStorage.getItem("token")!==null){
      return true;
    }else{
      return false;
    }
  }
  
  public doLogout():void{
    localStorage.removeItem("token");  
  }

  public doRegister(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/RegisterServlet",body);
  }

  public setLogged(token:string){
    localStorage.setItem("token",token);
    this.router.navigateByUrl("/welcome");
  }

  /*public getUser(){
    if(this.isLogged()===true){
      return this.httprequest.getRequest(environment.serverUrl + "/LoginServlet");
    }
    return false;
  }*/

  public getUser(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/LoginServlet");
  }


  public checkRuolo() : Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/ControllaRuoloServlet",{message:localStorage.getItem("token")});
  }

  public isAdmin():Observable<boolean>{
    return this.checkRuolo().pipe(
      map(response => {
        if (response.message==="admin"){
          return true;
        }
        return false;
      })
    )
  }


}
