import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';

import { ServerRequest } from '../models/ServerRequest.interface';
import { environment } from '../../environments/environment';
import { ProdottiFull } from '../models/prodottiFull.interface';


@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http:HttpClient) { }

  public getRequest(url:string):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(url);
  }

  public getImmagine(url:string):Observable<Blob>{
    return this.http.get(environment.serverUrl+ "/ImmagineServlet?immagine=" + url,{responseType:'blob'});
  }

  public postRequest(url:string,body:ServerRequest | {message:string | null} | FormData | {token:string,payerId:string,cartItems:{product : ProdottiFull, quantity : number, tagliaScelta : string}[]}):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(url,body);
  }

  public putRequest(url: string, body: ServerRequest | {message:string | null} | FormData): Observable<ServerResponse> {
    return this.http.put<ServerResponse>(url, body);
  }

  public deleteRequest(url: string): Observable<ServerResponse> {
    return this.http.delete<ServerResponse>(url);
  }
}
