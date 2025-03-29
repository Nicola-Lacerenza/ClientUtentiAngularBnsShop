import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaypalService } from '../../services/paypal.service';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.css'
})
export class CheckoutSuccessComponent implements OnInit {


  constructor(private route : ActivatedRoute,
              private paypalService : PaypalService,
              private router : Router
  ) { }

  ngOnInit(): void {
    const paymentId = this.route.snapshot.queryParamMap.get('paymentId');
    const payerId = this.route.snapshot.queryParamMap.get('payerId');
    if (paymentId && payerId) {
      this.paypalService.executePayment(paymentId, payerId).subscribe({
        next : (response : ServerResponse) => {
          console.log('Payment executed successfully:', response);
        },
        error : (error : HttpErrorResponse)=> {
          console.error('Error executing payment:', error);
        }
    });
    } else {
      console.error('Payment ID or Payer ID is missing in the URL');
    }
  }

  
}
