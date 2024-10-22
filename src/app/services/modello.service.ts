import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class ModelloService {

  constructor(private httprequest:HttpRequestService) { }
  public getModel(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/ModelloServlet/"+id);
  }

  public getModels(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/ModelloServlet");
  }

  public insertModel(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/ModelloServlet",body)
  }
}
