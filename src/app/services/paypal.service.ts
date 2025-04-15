import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { CartService } from './cart.service';
import { environment } from '../../environments/environment';
import { ServerResponse } from '../models/ServerResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor(private httpRequest : HttpRequestService, private cartService : CartService) { }

  public createOrder() : Observable<ServerResponse> {
    const body = this.cartService.getListProducts();
    return this.httpRequest.postRequest(environment.serverUrl + "/CreaPagamento",{body});
  }

  public executePayment(token: string, payerId: string): Observable<ServerResponse> {
    return this.httpRequest.postRequest(environment.serverUrl + "/ConfermaPagamentoServlet",{token,payerId});
  }
}
