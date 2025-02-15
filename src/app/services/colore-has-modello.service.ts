import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class ColoreHasModelloService {

  constructor(private httprequest:HttpRequestService) { }

  
  public getColoreHasModello(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/ColoreModelloServlet?id="+id);
  }

  public getColoreHasModelli(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/ColoreModelloServlet");
  }

  public insertColoreHasModello(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/ColoreModelloServlet",body)
  }

  public updateColoreHasModello(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/ColoreModelloServlet?id=" + id, body);
  }

  public deleteColoreHasModello(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/ColoreModelloServlet?id=" + id);
  }
}
