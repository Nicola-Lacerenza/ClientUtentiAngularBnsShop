import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PaypalService } from '../../services/paypal.service';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.css'
})
export class CheckoutSuccessComponent implements OnInit {
  constructor(private route : ActivatedRoute,private paypalService : PaypalService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
			next: (params:Params) => {
				const token:string = params["token"];
				const payerId:string = params["PayerID"];
				this.paypalService.executePayment(token,payerId).subscribe({
					next: (response:ServerResponse) => {
						console.log('Payment executed successfully:', response);
					},
					error: (error:HttpErrorResponse) => {
						console.error('Error executing payment:', error);
					}
				});
			}
		});
  }
}
