import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class CodiceScontoService {

  constructor(private httprequest:HttpRequestService) { }

  
  public getCodiceSconto(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/CodiceScontoServlet?id="+id);
  }

  public getCodiceSconti(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/CodiceScontoServlet");
  }

  public insertCodiceSconto(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/CodiceScontoServlet",body)
  }

  public updateCodiceSconto(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/CodiceScontoServlet?id=" + id, body);
  }

  public deleteCodiceSconto(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/CodiceScontoServlet?id=" + id);
  }
}
