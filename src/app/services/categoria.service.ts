import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private httprequest:HttpRequestService) {  }

  public getCetegoria(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/CategoriaServlet/"+id);
  }

  public getCategorie(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/CategoriaServlet");
  }

  public insertCategoria(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/CategoriaServlet",body)
  }
}
