import { Component } from '@angular/core';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { CartService } from '../../services/cart.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  total = 0;
  deliveryType: 'spedizione' | 'ritiro' = 'spedizione';
  items : {product : ProdottiFull, quantity : number, tagliaScelta : string}[];

  // Flag per conferma delle sezioni
  shippingConfirmed = false;
  paymentConfirmed = false;

  // Dati di spedizione/ritiro
  shippingData = {
    email: '',
    nome: '',
    cognome: '',
    indirizzo: '',
    telefono: '',
    negozio: ''
  };

  // Dati di pagamento (inclusi i campi per carta)
  paymentData = {
    paymentType: '', // "carta" oppure "paypal"
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  ngOnInit() {
    this.items = this.cartService.getListProducts();
    this.calculateTotal();
  }

  constructor(private cartService : CartService) {
      this.items = [];
  }

  onDeliveryChange(type: 'spedizione' | 'ritiro') {
    this.deliveryType = type;
  }

  confirmShipping() {
    // Qui potresti inserire validazioni extra se necessario
    this.shippingConfirmed = true;
  }

  editShipping() {
    this.shippingConfirmed = false;
  }

  confirmPayment() {
    // Qui potresti inserire validazioni extra se necessario
    this.paymentConfirmed = true;
  }

  editPayment() {
    this.paymentConfirmed = false;
  }

  onSubmitOrder() {
    console.log('Dati di spedizione:', this.shippingData);
    console.log('Dati di pagamento:', this.paymentData);
    alert('Ordine completato!');
  }

  public createUrlByString(filename: string): string {
    return `${environment.serverUrl}/${filename}`;
  }
  calculateTotal() {
    this.total = this.items.reduce((acc, item) => acc + item.product.prezzo * item.quantity, 0);
  }
}
