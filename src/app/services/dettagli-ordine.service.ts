import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class DettagliOrdineService {

  constructor(private httprequest:HttpRequestService) { }
  
  public getDettagliOrdine(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/DettagliOrdineServlet?id="+id);
  }

  public getDettagliOrdini(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/DettagliOrdineServlet");
  }

  public insertDettagliOrdine(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/DettagliOrdineServlet",body)
  }

  public updateDettagliOrdine(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/DettagliOrdineServlet?id=" + id, body);
  }

  public deleteDettagliOrdine(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/DettagliOrdineServlet?id=" + id);
  }
}
