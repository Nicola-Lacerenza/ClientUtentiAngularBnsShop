import { EnvironmentInjector, Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class ColoreService {

  constructor(private httprequest:HttpRequestService) { }
  
  public getColore(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/ColoreServlet/"+id);
  }

  public getColori(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/ColoreServlet");
  }

  public insertColore(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/ColoreServlet",body)
  }

  public updateColore(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/ColoreServlet/" + id, body);
  }

  public deleteColore(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/ColoreServlet/" + id);
  }
}
