import { Component, OnInit } from '@angular/core';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { CartService } from '../../services/cart.service';
import { environment } from '../../../environments/environment';
import { Indirizzo } from '../../models/indirizzo.interface';
import { IndirizzoService } from './../../services/indirizzo.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  total = 0;
  deliveryType: 'spedizione' | 'ritiro' = 'spedizione';
  items : {product : ProdottiFull, quantity : number, tagliaScelta : string}[];
  indirizzi : Indirizzo[] = [];
  
  // Flag per conferma delle sezioni
  shippingConfirmed = false;
  paymentConfirmed = false;

  // Dati di spedizione/ritiro
  shippingData : Indirizzo = {
    id : 0,
    id_utente : 0,
    nome : '',
    cognome : '',  
    citta : '',
    stato : '',
    cap : '',
    indirizzo : '',
    email : '',
    numero_telefono : '' 
  }

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
    this.indirizzoService.getindirizzi().subscribe(indirizzi => {
      this.indirizzi = <Indirizzo[]>indirizzi.message;
    });
  }

  constructor(private cartService : CartService , private indirizzoService : IndirizzoService) {
      this.items = [];
  }


  onDeliveryChange(type: 'spedizione' | 'ritiro') {
    this.deliveryType = type;
  }

  confirmShipping(form : NgForm) {
    if(form.valid) {
      this.indirizzoService.insertindirizzo({body : this.shippingData}).subscribe(indirizzo => {
        this.indirizzi.push(<Indirizzo>indirizzo.message);
      });
    }
    this.shippingConfirmed = true;
  }

  selectIndirizzo(event : Event){
    const target = event.target as HTMLSelectElement;
    const id = parseInt(target.value);
    this.shippingData = <Indirizzo>this.indirizzi.find(indirizzo => indirizzo.id === id);
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
