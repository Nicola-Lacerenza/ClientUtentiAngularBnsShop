import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  items : {product : ProdottiFull, quantity : number, tagliaScelta : string}[];
  total = 0;
  shippingCost = 5; // Esempio di costo di spedizione
  promoCode = '';
  discount = 0;
  showPromoCode = false;

  // Aggiunte per la gestione del popup di selezione taglie
  showSizeSelector = false; // Stato del popup
  selectedItem: any = null; // Prodotto selezionato per il cambio di taglia
  selectedSize: string = ''; // Taglia selezionata nel popup
  availableSizes = ['33', '36', '36.5', '37.5', '38', '38.5', '39']; // Taglie disponibili

  ngOnInit() {
    this.items = this.cartService.getListProducts();
    this.calculateTotal();
  }
  constructor(private cartService : CartService) {
    this.items = [];
  }

  updateCart(id : number, taglia : string, quantity : number) {
    this.cartService.updateProductQuantity(id,taglia,quantity);
    this.items = this.cartService.getListProducts();
    this.calculateTotal();
  }

  togglePromoCode() {
    this.showPromoCode = !this.showPromoCode;
  }

  applyPromoCode() {
    if (this.promoCode === 'PROMO10') {
      this.discount = 10;
    } else {
      this.discount = 0;
    }
    this.total = this.total - this.discount;
  }

  removeItem(id : number, taglia : string) {
    this.cartService.removeProduct(id,taglia);
    this.items = this.cartService.getListProducts();
    this.calculateTotal();
  }

  // Metodo per aprire il popup di selezione taglia
  openSizeSelector(item: ProdottiFull, size: string) {
    this.selectedItem = item;
    this.selectedSize = size; // Imposta la taglia corrente come selezionata
    this.showSizeSelector = true; // Mostra il popup
  }

  // Metodo per gestire la selezione della taglia nel popup
  selectSize(size: string) {
    this.selectedSize = size; // Aggiorna la taglia selezionata
  }

  // Metodo per confermare la taglia e chiudere il popup
  confirmSize() {
    if (this.selectedItem) {
      //this.cartService. // Aggiorna la taglia nel carrello
      //this.items = this.cartService.getListProducts(); // Aggiorna la lista di prodotti
      //this.calculateTotal(); // Ricalcola il totale
    }
    this.closeSizeSelector(); // Chiude il popup
  }

  // Metodo per chiudere il popup
  closeSizeSelector() {
    this.showSizeSelector = false;
    this.selectedItem = null;
  }

  payWithPaypal() {
    alert('Pagamento con PayPal non ancora implementato.');
  }

  goToCheckout() {
    
    alert('Vai alla pagina di pagamento non ancora implementato.');
  }
  
  public createUrlByString(filename: string): string {
    return `${environment.serverUrl}/${filename}`;
  }

  
  calculateTotal() {
    this.total = this.items.reduce((acc, item) => acc + item.product.prezzo * item.quantity, 0);
  }
}