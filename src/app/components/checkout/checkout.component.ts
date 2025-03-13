import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  // Selezione tra spedizione e ritiro
  deliveryType: 'spedizione' | 'ritiro' = 'spedizione';

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
}
