import { Component } from '@angular/core';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.css']
})
export class PdpComponent {
  // Variabili di stato per la gestione della logica
  selectedSize: string | null = null; // Taglia selezionata inizialmente
  mainImage: string = 'assets/main_image.jpg'; // Immagine principale del prodotto (da sostituire con l'immagine principale effettiva)
  thumbnailImages: string[] = [ // Miniature delle immagini del prodotto
    'assets/image1.jpg',
    'assets/image2.jpg',
    'assets/image3.jpg',
    'assets/image4.jpg'
  ];
  isInfoVisible: { [key: string]: boolean } = { // Visibilità delle informazioni aggiuntive
    sizeFit: false,
    shipping: false,
    reviews: false,
    moreInfo: false
  };

  // Metodo per cambiare l'immagine principale al passaggio sulle miniature
  changeMainImage(newImage: string) {
    this.mainImage = newImage;
  }

  // Metodo per selezionare una taglia
  selectSize(size: string) {
    this.selectedSize = size;
    console.log(`Taglia selezionata: ${size}`);
  }

  // Metodo per aggiungere al carrello
  addToCart() {
    if (this.selectedSize) {
      console.log(`Aggiunto al carrello: Taglia ${this.selectedSize}`);
      alert(`Prodotto con taglia ${this.selectedSize} aggiunto al carrello.`);
    } else {
      alert("Per favore, seleziona una taglia prima di aggiungere al carrello.");
    }
  }

  // Metodo per aggiungere ai preferiti
  addToFavorites() {
    if (this.selectedSize) {
      console.log(`Aggiunto ai preferiti: Taglia ${this.selectedSize}`);
      alert(`Prodotto con taglia ${this.selectedSize} aggiunto ai preferiti.`);
    } else {
      alert("Per favore, seleziona una taglia prima di aggiungere ai preferiti.");
    }
  }

  // Metodo per alternare la visibilità delle informazioni aggiuntive
  toggleInfo(info: string) {
    this.isInfoVisible[info] = !this.isInfoVisible[info];
  }
}
