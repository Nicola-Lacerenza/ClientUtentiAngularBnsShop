import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http:HttpClient) { }

  public getRequest(url:string):Observable<any>{
    return this.http.get(url);
  }

  public postRequest(url:string,body:any):Observable<any>{
    return this.http.post(url,body);
  }
}
