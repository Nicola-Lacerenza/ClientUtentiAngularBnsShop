import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { map, Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { ServerRequest } from '../models/ServerRequest.interface';
import { Ordine } from '../models/ordine.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {

  constructor(private httprequest:HttpRequestService) { }

  public getOrdine(id:number):Observable<Ordine>{
    return this.httprequest.getRequest(environment.serverUrl + "/OrdineServlet?id="+id).pipe(
      map((response: ServerResponse) => {
        const data = <Ordine>response.message;
        return data;
      })
    );
  }

  public getOrdini(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/OrdineServlet");
  }

  public insertOrdine(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/OrdineServlet",body)
  }

  public updateOrdine(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/OrdineServlet?id=" + id, body);
  }

  public deleteOrdine(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/OrdineServlet?id=" + id);
  }
}
