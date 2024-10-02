import { Component } from '@angular/core';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.css'] // Assicurati che sia styleUrls, non styleUrl
})
export class PdpComponent {
  selectedSize: string | null = null; // Taglia selezionata inizialmente nulla
  isInfoVisible: { [key: string]: boolean } = { // Inizializza l'oggetto per gestire la visibilità delle informazioni
    sizeFit: false,
    shipping: false,
    reviews: false,
    moreInfo: false
  };

  selectSize(size: string) {
    this.selectedSize = size; // Imposta la taglia selezionata
  }

  addToCart() {
    // Logica per aggiungere al carrello
    console.log(`Aggiunto al carrello: ${this.selectedSize}`);
  }

  addToFavorites() {
    // Logica per aggiungere ai preferiti
    console.log(`Aggiunto ai preferiti: ${this.selectedSize}`);
  }

  toggleInfo(info: string) {
    this.isInfoVisible[info] = !this.isInfoVisible[info]; // Alterna la visibilità della sezione informativa
  }
}
