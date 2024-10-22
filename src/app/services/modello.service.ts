import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class ModelloService {

  constructor(private httprequest:HttpRequestService) { }

  public getModello(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/ModelloServlet/"+id);
  }

  public getModelli(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/ModelloServlet");
  }

  public insertModello(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/ModelloServlet",body)
  }

  public updateModello(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/ModelloServlet/" + id, body);
  }

  public deleteModello(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/ModelloServlet/" + id);
  }
}
