import { Component } from '@angular/core';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProdottiService } from '../../services/prodotti.service';
import { AuthappService } from '../../services/authapp.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.css']
})
export class PdpComponent {

  private colorNameSelected:string[] | undefined;
  private taglie: { taglia: string, quantita: number }[] = [];
  private actualId: number | undefined;
  public urlListProductToUpdate: string[] | undefined ;
  public actualProductSelected: ProdottiFull = { 
    id: 0,
    nome_modello: "",
    descrizione_modello: "",
    id_categoria: 0,
    nome_categoria: "",
    target: "",
    id_brand: 0,
    nome_brand: "",
    descrizione_brand: "", 
    stato_pubblicazione: 0,
    prezzo: 0,
    taglieProdotto: [],
    url: [],
    nome_colore: []
  }; 

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

  constructor(
    private prodottiService: ProdottiService, 
    private auth: AuthappService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  private getProduct(): void{
// Leggi il parametro "id" dalla rotta
    const tmp = this.route.snapshot.paramMap.get("id");

    // Se "id" esiste, chiama il servizio per ottenere il prodotto
    if (tmp !== null) {
      this.actualId = parseInt(tmp);
      console.log("ID selezionato:", this.actualId);
      this.prodottiService.getProdotto(this.actualId).subscribe({
        next: (data: ServerResponse) => {
          const tmp = <ProdottiFull>data.message;
          console.log("Prodotto selezionato:",tmp);
          this.actualProductSelected = tmp;
          this.urlListProductToUpdate = tmp.url;
          this.colorNameSelected=tmp.nome_colore;
          for(const taglia of tmp.taglieProdotto){
            let i=0;
            while(i<this.taglie.length && this.taglie[i].taglia !== taglia.taglia.taglia_Eu){
              i++;
            }
            this.taglie[i].quantita+=taglia.taglia_prodotti.quantita;
          }
        },
        error: (error: HttpErrorResponse) => {
          this.urlListProductToUpdate = undefined;
          this.colorNameSelected = undefined;
          if (error.status === 401 || error.status === 403) {
            this.auth.doLogout();
          } else {
            console.error(error);
          }
        }
      });
    }else{
      this.urlListProductToUpdate = undefined;
      this.colorNameSelected = undefined;
    }
  }

  public createUrlByString(filename: string): string {
    return `${environment.serverUrl}/${filename}`;
  }  
  
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
