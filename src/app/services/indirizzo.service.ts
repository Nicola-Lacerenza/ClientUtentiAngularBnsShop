import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { ServerResponse } from '../models/ServerResponse.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class IndirizzoService {

  constructor(private httprequest:HttpRequestService) { }
  
  public getindirizzo(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/IndirizziServlet?id="+id);
  }

  public getindirizzi(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/IndirizziServlet");
  }

  public insertindirizzo(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/IndirizziServlet",body)
  }

  public updateindirizzo(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/IndirizziServlet?id=" + id, body);
  }

  public deleteindirizzo(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/IndirizziServlet?id=" + id);
  }
}
