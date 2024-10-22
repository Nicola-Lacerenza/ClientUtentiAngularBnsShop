import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';
import { ServerRequest } from '../models/ServerRequest.interface';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private httprequest:HttpRequestService) { }
  
  public getCustomer(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/CustomerServlet/"+id);
  }

  public getCustomers(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/CustomerServlet");
  }

  public insertCustomer(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/CustomerServlet",body)
  }

  public updateCustomer(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/CustomerServlet/" + id, body);
  }

  public deleteCustomer(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/CustomerServlet/" + id);
  }
}
