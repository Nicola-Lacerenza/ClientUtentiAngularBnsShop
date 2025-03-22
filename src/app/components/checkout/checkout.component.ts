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
  // Rimosso 'ritiro', teniamo solo 'spedizione'
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
    id_utente: 0,
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
    private indirizzoService: IndirizzoService
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
      id_utente: 0,
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
      this.indirizzoService
        .insertindirizzo({ body: this.editingAddress }) // In questo esempio usiamo lo stesso metodo per update/insert
        .subscribe((res) => {
          const updated = res.message as Indirizzo;
          const index = this.indirizzi.findIndex((i) => i.id === updated.id);
          if (index > -1) {
            this.indirizzi[index] = updated;
          }
          this.editingAddress = null;
        });
    } else {
      // Aggiunta nuovo indirizzo
      this.indirizzoService
        .insertindirizzo({ body: this.editingAddress! })
        .subscribe((res) => {
          const nuovo = res.message as Indirizzo;
          this.indirizzi.push(nuovo);
          this.editingAddress = null;
        });
    }
  }

  // Annulla editing/aggiunta
  onCancelEdit() {
    this.editingAddress = null;
  }

  // Conferma della spedizione
  confirmShipping() {
    if (!this.selectedAddressId) return; // Non confermare se nessun indirizzo è selezionato
    this.shippingConfirmed = true;
  }

  editShipping() {
    this.shippingConfirmed = false;
  }

  // Conferma del pagamento
  confirmPayment() {
    this.paymentConfirmed = true;
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
}
