import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class ImmaginiService {

  constructor(private httprequest:HttpRequestService) { }
  
  public getimmagine(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/immaginiServlet?id="+id);
  }

  public getimmagini(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/immaginiServlet");
  }

  public insertimmagini(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/immaginiServlet",body)
  }

  public updateimmagini(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/immaginiServlet?id=" + id, body);
  }

  public deleteimmagini(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/immaginiServlet?id=" + id);
  }
}
