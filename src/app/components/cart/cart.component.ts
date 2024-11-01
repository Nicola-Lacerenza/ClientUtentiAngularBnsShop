import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items = [
    { name: 'Nike Air Max Dn', price: 20, quantity: 1, size: '37.5', image: 'assets/images/prodotti/prodotto1.png' },
    { name: 'Nike Air Max Dn', price: 90, quantity: 1, size: '38.5', image: 'assets/images/prodotti/prodotto2.png' },
    { name: 'Nike Air Max Dn', price: 90, quantity: 1, size: '38.5', image: 'assets/images/prodotti/prodotto1.png' }
  ];
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
    this.updateCart();
  }

  updateCart() {
    this.total = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
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

  removeItem(item: { name: string, price: number, quantity: number, size: string, image: string }) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1); // Rimuove l'elemento dall'array
      this.updateCart(); // Aggiorna il totale
    }
  }

  // Metodo per aprire il popup di selezione taglia
  openSizeSelector(item: any) {
    this.selectedItem = item;
    this.selectedSize = item.size; // Imposta la taglia corrente come selezionata
    this.showSizeSelector = true; // Mostra il popup
  }

  // Metodo per gestire la selezione della taglia nel popup
  selectSize(size: string) {
    this.selectedSize = size; // Aggiorna la taglia selezionata
  }

  // Metodo per confermare la taglia e chiudere il popup
  confirmSize() {
    if (this.selectedItem) {
      this.selectedItem.size = this.selectedSize; // Aggiorna la taglia dell'elemento selezionato
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
}