import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http : HttpRequestService) { }

  public creaGoogleToken(code : string) : Observable<ServerResponse> {
    return this.http.postRequest(environment.serverUrl + '/TokenGoogleServlet', {code: code});
  }

  public recuperaGoogleToken() : Observable<ServerResponse> {
    return this.http.getRequest(environment.serverUrl + '/TokenGoogleServlet');
  }

  
}
