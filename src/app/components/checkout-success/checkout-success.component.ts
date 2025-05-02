import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PaypalService } from '../../services/paypal.service';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.css'
})
export class CheckoutSuccessComponent implements OnInit {
  constructor(
	private route : ActivatedRoute,
	private paypalService : PaypalService,
	private cartService : CartService
){}

  ngOnInit(): void {
    this.executePayment();
  }
  
private executePayment(): void {
		this.route.queryParams.subscribe({
			next: (params:Params) => {
				const token:string = params["token"];
				const payerId:string = params["PayerID"];
				const cartItems = this.cartService.getListProducts();
				this.paypalService.executePayment(token,payerId,cartItems).subscribe({
					next: (response:ServerResponse) => {
						console.log('Payment executed successfully:', response);
						this.cartService.clearCart();
					},
					error: (error:HttpErrorResponse) => {
						console.error('Error executing payment:', error);
					}
				});
			}
		});
	}
}
