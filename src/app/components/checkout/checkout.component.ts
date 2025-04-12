import { Component, OnInit } from '@angular/core';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { CartService } from '../../services/cart.service';
import { Indirizzo } from '../../models/indirizzo.interface';
import { IndirizzoService } from './../../services/indirizzo.service';
import { NgForm } from '@angular/forms';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpRequestService } from '../../services/http-request.service';
import { PaypalService } from '../../services/paypal.service';
import { AuthappService } from '../../services/authapp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  total = 0;
  deliveryType: 'spedizione' = 'spedizione';

  items: { product: ProdottiFull; quantity: number; tagliaScelta: string }[] = [];
  indirizzi: Indirizzo[] = [];
  selectedAddressId: number | null = null;   // ID dell'indirizzo selezionato

  // Flag per conferma delle sezioni
  shippingConfirmed = false;
  paymentConfirmed = false;

  // Controllo per mostrare/nascondere il form di aggiunta o modifica indirizzo
  editingAddress: Indirizzo | null = null;   // Se non è null, stiamo modificando/aggiungendo un indirizzo

  // Dati di spedizione (usati sia in aggiunta che modifica)
  shippingData: Indirizzo = {
    id: 0,
    nome: '',
    cognome: '',
    citta: '',
    stato: '',
    cap: '',
    indirizzo: '',
    email: '',
    numero_telefono: ''
  };

  // Dati di pagamento (inclusi i campi per carta)
  paymentData = {
    paymentType: '', // "carta" oppure "paypal"
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  constructor(
    private cartService: CartService,
    private indirizzoService: IndirizzoService,
    private paypalService : PaypalService,
    private authService : AuthappService,
    private router : Router
  ) {}

  ngOnInit() {
    this.items = this.cartService.getListProducts();
    this.calculateTotal();

    // Carichiamo la lista degli indirizzi esistenti
    this.indirizzoService.getindirizzi().subscribe((res) => {
      this.indirizzi = res.message as Indirizzo[];
    });
  }

  // Calcolo del totale carrello
  calculateTotal() {
    this.total = this.items.reduce(
      (acc, item) => acc + item.product.prezzo * item.quantity,
      0
    );
  }

  // (In caso in futuro volessi reintrodurre altre tipologie di consegna)
  onDeliveryChange(type: 'spedizione') {
    this.deliveryType = type;
  }

  // Quando si seleziona un indirizzo con il radio button
  onSelectAddress(indirizzo: Indirizzo) {
    this.selectedAddressId = indirizzo.id;
    // Aggiorna i dati di shipping con l'indirizzo selezionato
    this.shippingData = { ...indirizzo };
  }

  // Mostra il form per aggiungere un nuovo indirizzo
  onAddNewAddress() {
    this.editingAddress = {
      id: 0,
      nome: '',
      cognome: '',
      citta: '',
      stato: '',
      cap: '',
      indirizzo: '',
      email: '',
      numero_telefono: ''
    };
  }

  // Modifica un indirizzo esistente
  onEditAddress(indirizzo: Indirizzo) {
    this.editingAddress = { ...indirizzo }; // clona per evitare mutazioni
  }

  // Salva (o aggiorna) l'indirizzo in fase di editing
  onSaveAddress(form: NgForm) {
    if (form.invalid) return;

    if (this.editingAddress?.id && this.editingAddress.id !== 0) {
      // Se ha un id diverso da 0, stiamo aggiornando un indirizzo esistente
      this.indirizzoService.updateindirizzo(this.editingAddress.id,form.value).subscribe({
        next : (value: ServerResponse) => {
          const tmp : string = <string>value.message;
          const index : number = this.indirizzi.findIndex((indirizzo) => indirizzo.id === this.editingAddress?.id);
          this.indirizzi.splice(index,1);
          this.indirizzi.push(<Indirizzo>form.value);
          this.editingAddress = null;
        },
        error : (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    } else {
      // Aggiunta nuovo indirizzo
      this.indirizzoService.insertindirizzo(form.value).subscribe({
        next : (value: ServerResponse) => {
          const tmp : string = <string>value.message;
          this.editingAddress = null;
          this.indirizzi.push(<Indirizzo>form.value);
        },
        error : (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    }
  }

  // Annulla editing/aggiunta
  onCancelEdit() {
    this.editingAddress = null;
  }

  // Conferma della spedizione
  confirmShipping() {
    if (!this.selectedAddressId) return; 
    this.shippingConfirmed = true;
  }

  editShipping() {
    this.shippingConfirmed = false;
  }

  editPayment() {
    this.paymentConfirmed = false;
  }

  // Invio finale dell'ordine
  onSubmitOrder() {
    console.log('Dati di spedizione:', this.shippingData);
    console.log('Dati di pagamento:', this.paymentData);
    alert('Ordine completato!');
  }

  // Helper per generare url di immagini
  public createUrlByString(filename: string): string {
    return `${environment.serverUrl}/${filename}`;
  }

  public createOrder() {
    this.paypalService.createOrder().subscribe({
      next: (res: ServerResponse) => {
        window.location.href = <string>res.message;
      },
      error: (err: HttpErrorResponse) => {
        if(err.status === 401) {
          this.authService.doLogout();
        }else{
          console.error('Error creating order:', err);
        }
        
      }
    });
  } 

}
