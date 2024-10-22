import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class TagliaService {

  constructor(private httprequest:HttpRequestService) { }

  public getTaglia(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/TagliaServlet/"+id);
  }

  public getTaglie(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/TagliaServlet");
  }

  public insertTaglia(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/TagliaServlet",body)
  }

  public updateTaglia(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/TagliaServlet/" + id, body);
  }

  public deleteTaglia(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/TagliaServlet/" + id);
  }
}
