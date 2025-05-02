import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GestioneImmaginiService } from '../../services/gestione-immagini.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: { product: ProdottiFull, quantity: number, tagliaScelta: string }[] = [];
  total = 0;
  shippingCost = 5;
  promoCode = '';
  discount = 0;
  showPromoCode = false;

  showSizeSelector = false;
  selectedItem: any = null;
  selectedSize: string = '';
  availableSizes = ['33', '36', '36.5', '37.5', '38', '38.5', '39'];

  constructor(
    private cartService: CartService, 
    private router: Router,
    private gestioneImmagini : GestioneImmaginiService
  ) {}

  ngOnInit() {
    this.items = this.cartService.getListProducts();
    this.calculateTotal();
  }

  updateCart(id: number, taglia: string, quantity: number) {
    this.cartService.updateProductQuantity(id, taglia, quantity);
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

  removeItem(id: number, taglia: string) {
    this.cartService.removeProduct(id, taglia);
    this.items = this.cartService.getListProducts();
    this.calculateTotal();
  }

  openSizeSelector(item: ProdottiFull, size: string) {
    this.selectedItem = item;
    this.selectedSize = size;
    this.showSizeSelector = true;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  confirmSize() {
    if (this.selectedItem) {
      // Qui si può aggiornare la taglia nel carrello
      // Esempio:
      // this.cartService.updateProductSize(this.selectedItem.id, this.selectedSize);
      // this.items = this.cartService.getListProducts();
      // this.calculateTotal();
    }
    this.closeSizeSelector();
  }

  closeSizeSelector() {
    this.showSizeSelector = false;
    this.selectedItem = null;
  }

  increment(item: any) {
    item.quantity++;
    this.updateCart(item.product.id, item.tagliaScelta, item.quantity);
  }

  decrement(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart(item.product.id, item.tagliaScelta, item.quantity);
    }
  }

  openPDP(id: number) {
    this.router.navigate(['/pdp', id]);
  }

  payWithPaypal() {
    alert('Pagamento con PayPal non ancora implementato.');
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
    
  public getImageUrl(imageName: string): Observable<string | undefined> {
    return this.gestioneImmagini.getUrlImmagine(imageName);
  }
  
  calculateTotal() {
    this.total = this.items.reduce((acc, item) => acc + item.product.prezzo * item.quantity, 0);
  }
}
