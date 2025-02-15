import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class FornitoriService {
  
  constructor(private httprequest:HttpRequestService) { }
  
  public getFornitore(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/FornitoriServlet?id="+id);
  }

  public getFornitori(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/FornitoriServlet");
  }

  public insertFornitori(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/FornitoriServlet",body)
  }

  public updateFornitori(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/FornitoriServlet?id=" + id, body);
  }

  public deleteFornitori(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/FornitoriServlet?id=" + id);
  }
}
