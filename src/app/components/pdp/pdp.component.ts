import { Component } from '@angular/core';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProdottiService } from '../../services/prodotti.service';
import { AuthappService } from '../../services/authapp.service';
import { environment } from '../../../environments/environment';
import { Taglia } from './../../models/taglia.interface';
import { Taglie_Has_Prodotti } from './../../models/taglie_has_prodotti.interface';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.css']
})
export class PdpComponent {

  private _actualMainImage: number;
  private colorNameSelected:string[] | undefined
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
  ) {this._actualMainImage=0;
     const totalTaglie : string[] =['35.5', '36', '36.5', '37','37.5', '38', '38.5', '39','39.5', '40', '40.5', '41','41.5', '42', '42.5', '43','43.5', '44', '44.5'];
     for (let i = 0;i<totalTaglie.length;i++){  
      this.taglie.push({taglia:totalTaglie[i], quantita: 0 });
    }
  }

  ngOnInit(): void {
    this.getProduct();
  }

  public get actualMainImage(): number {
    return this._actualMainImage;
  }

  public setMainImage(index: number): void {
    this._actualMainImage = index;
  }
  

  private getProduct(): void{
// Leggi il parametro "id" dalla rotta
    const tmp = this.route.snapshot.paramMap.get("id");

    // Se "id" esiste, chiama il servizio per ottenere il prodotto
    if (tmp !== null) {
      this.actualId = parseInt(tmp);
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
          console.log("Taglie disponibili:",this.actualProductSelected.taglieProdotto);
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
    let i = 0;
    const array: string[] = <string[]>this.urlListProductToUpdate;
    while (i< array.length && array[i] !== newImage){
      i++;
    }
    if(i<array.length){
      this._actualMainImage = i;
      return i ;
    }
    return 0;
  }

  public isTagliaAvailable(taglia: string): boolean {
    const available = this.taglie.find(item => item.taglia === taglia);
    return available ? available.quantita > 0 : false;
  }

  // Metodo per selezionare una taglia
  selectSize(size: string) {
    this.selectedSize = size;
    console.log(`Taglia selezionata: ${size}`);
  }

  // Metodo per aggiungere al carrello
  addToCart() {
    if (this.selectedSize) {
    } else {
    }
  }

  // Metodo per aggiungere ai preferiti
  addToFavorites() {
    if (this.selectedSize) {
    } else {
    }
  }

  // Metodo per alternare la visibilità delle informazioni aggiuntive
  toggleInfo(info: string) {
    this.isInfoVisible[info] = !this.isInfoVisible[info];
  }
}
