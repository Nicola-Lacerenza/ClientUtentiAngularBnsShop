import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ServerResponse } from '../models/ServerResponse.interface';
import { ServerRequest } from '../models/ServerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httprequest:HttpRequestService) {  }

  public getBrand(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/BrandServlet/"+id);
  }

  public getBrands(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/BrandServlet");
  }

  public insertBrand(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/BrandServlet",body)
  }

  public updateBrand(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/BrandServlet/" + id, body);
  }

  public deleteBrand(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/BrandServlet/" + id);
  }
}
