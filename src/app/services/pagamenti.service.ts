import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { ServerResponse } from '../models/ServerResponse.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class PagamentiService {

  constructor(private httprequest:HttpRequestService) { }

  public getPagamento(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/PagamentoServlet?id="+id);
  }

  public getPagamenti(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/PagamentoServlet");
  }

  public insertPagamento(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/PagamentoServlet",body)
  }

  public updatePagamento(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/PagamentoServlet?id=" + id, body);
  }

  public deletePagamento(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/PagamentoServlet?id=" + id);
  }
}
