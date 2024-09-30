import { Component } from '@angular/core';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.css']
})
export class PdpComponent {

  selectedSize: string = '';

  // Metodo per selezionare la taglia
  selectSize(size: string) {
    this.selectedSize = size;
  }

  // Metodo per aggiungere al carrello
  addToCart() {
    if (this.selectedSize) {
      alert(`Il prodotto con taglia ${this.selectedSize} è stato aggiunto al carrello!`);
    } else {
      alert('Seleziona una taglia prima di aggiungere al carrello.');
    }
  }

  // Metodo per aggiungere ai preferiti
  addToFavorites() {
    alert('Il prodotto è stato aggiunto ai preferiti!');
  }
}
