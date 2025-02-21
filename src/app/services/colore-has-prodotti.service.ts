import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class ColoreHasProdottiService {

  constructor(private httprequest:HttpRequestService) { }

  
  public getColoreHasProdotto(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/ColoreProdottiServlet?id="+id);
  }

  public getColoreHasProdotti(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/ColoreProdottiServlet");
  }

  public insertColoreHasProdotti(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/ColoreProdottiServlet",body)
  }

  public updateColoreHasProdotti(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/ColoreProdottiServlet?id=" + id, body);
  }

  public deleteColoreHasProdotti(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/ColoreProdottiServlet?id=" + id);
  }
}
