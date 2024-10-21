import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private httprequest:HttpRequestService) {  }

  public getBrand(id:number):Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/BrandServlet/"+id);
  }

  public getBrands(): Observable<ServerResponse>{
    return this.httprequest.getRequest(environment.serverUrl + "/BrandServlet");
  }
}
