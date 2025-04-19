import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { ServerRequest } from '../models/ServerRequest.interface';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResoService {

  constructor(private httprequest:HttpRequestService) { }

    public creaReso(body:ServerRequest):Observable<ServerResponse>{
      return this.httprequest.postRequest(environment.serverUrl + "/ResoServlet",body)
    }
}
