import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {

  constructor(private httprequest:HttpRequestService) { }

  public getOrdine(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/OrdineServlet/"+id);
  }

  public getOrdini(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/OrdineServlet");
  }

  public insertOrdine(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/OrdineServlet",body)
  }

  public updateOrdine(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/OrdineServlet/" + id, body);
  }

  public deleteOrdine(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/OrdineServlet/" + id);
  }
}
