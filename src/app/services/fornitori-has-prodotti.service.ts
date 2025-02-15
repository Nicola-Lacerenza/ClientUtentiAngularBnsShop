import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class FornitoriHasProdottiService {

  constructor(private httprequest:HttpRequestService) { }
  
  public getFornitoriProdotto(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/FornitoriProdottiServlet?id="+id);
  }

  public getFornitoriProdotti(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/FornitoriProdottiServlet");
  }

  public insertFornitoriProdotto(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/FornitoriProdottiServlet",body)
  }

  public updateFornitoriProdotto(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/FornitoriProdottiServlet?id=" + id, body);
  }

  public deleteFornitoriProdotto(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/FornitoriProdottiServlet?id=" + id);
  }
}
