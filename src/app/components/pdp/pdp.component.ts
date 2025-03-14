import { Component, OnInit } from '@angular/core';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdottiService } from '../../services/prodotti.service';
import { AuthappService } from '../../services/authapp.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.css']
})
export class PdpComponent implements OnInit {
  private _actualMainImage: number;
  private colorNameSelected: string[] | undefined;
  private taglie: { taglia: string, quantita: number }[] = [];
  private actualId: number | undefined;
  public urlListProductToUpdate: string[] | undefined;
  public actualProductSelected: ProdottiFull = { 
    id: 0,
    id_modello: 0,
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

  // Proprietà per i prodotti correlati
  public relatedProducts: ProdottiFull[] = [];

  // Stato della taglia selezionata
  selectedSize: string | null = null;

  // Stato per la visibilità delle info aggiuntive
  isInfoVisible: { [key: string]: boolean } = {
    sizeFit: false,
    shipping: false,
    reviews: false,
    moreInfo: false
  };

  constructor(
    private prodottiService: ProdottiService,
    private auth: AuthappService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this._actualMainImage = 0;
    const totalTaglie: string[] = ['35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5'];
    for (let i = 0; i < totalTaglie.length; i++){
      this.taglie.push({ taglia: totalTaglie[i], quantita: 0 });
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const tmp = params.get("id");
      if (tmp !== null) {
        this.actualId = parseInt(tmp, 10);
        this.getProduct();
      }
    });
  }

  public get actualMainImage(): number {
    return this._actualMainImage;
  }

  public setMainImage(index: number): void {
    if (this._actualMainImage !== index) {
      this._actualMainImage = index;
    }
  }
  
  private getProduct(): void {
    const tmp = this.route.snapshot.paramMap.get("id");
    if (tmp !== null) {
      this.actualId = parseInt(tmp, 10);
      this.prodottiService.getProdotto(this.actualId).subscribe({
        next: (data: ServerResponse) => {
          const tmpProd = <ProdottiFull>data.message;
          this.actualProductSelected = tmpProd;
          this.urlListProductToUpdate = tmpProd.url;
          this.colorNameSelected = tmpProd.nome_colore;
          
          // Reset delle quantità per le taglie
          this.taglie.forEach(item => item.quantita = 0);
          
          // Aggiorna le quantità per le taglie disponibili
          for (const taglia of tmpProd.taglieProdotto) {
            let i = 0;
            while (i < this.taglie.length && this.taglie[i].taglia !== taglia.taglia.taglia_Eu) {
              i++;
            }
            if (i < this.taglie.length) {
              this.taglie[i].quantita += taglia.taglia_prodotti.quantita;
            }
          }

          // Carica i prodotti correlati
          this.prodottiService.getProdotti().subscribe({
            next: (data: ServerResponse) => {
              const allProducts: ProdottiFull[] = <ProdottiFull[]>data.message;
              this.relatedProducts = allProducts.filter(prod => 
                prod.id_modello === this.actualProductSelected.id_modello &&
                prod.id !== this.actualProductSelected.id &&
                prod.stato_pubblicazione === 1
              );
            },
            error: (error: HttpErrorResponse) => {
              console.error("Errore nel caricamento dei prodotti correlati", error);
            }
          });
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
    } else {
      this.urlListProductToUpdate = undefined;
      this.colorNameSelected = undefined;
    }
  }

  public createUrlByString(filename: string): string {
    return `${environment.serverUrl}/${filename}`;
  }
  
  public isTagliaAvailable(taglia: string): boolean {
    const available = this.taglie.find(item => item.taglia === taglia);
    return available ? available.quantita > 0 : false;
  }

  selectSize(size: string) {
    this.selectedSize = size;
    console.log(`Taglia selezionata: ${size}`);
  }

  addToCart() {
    if (this.selectedSize) {
      // Logica per aggiungere al carrello
    } else {
      // Gestione dell'errore: nessuna taglia selezionata
    }
  }

  addToFavorites() {
    if (this.selectedSize) {
      // Logica per aggiungere ai preferiti
    } else {
      // Gestione dell'errore: nessuna taglia selezionata
    }
  }

  toggleInfo(info: string) {
    this.isInfoVisible[info] = !this.isInfoVisible[info];
  }

  // Naviga alla pagina del prodotto correlato
  selectRelatedProduct(product: ProdottiFull): void {
    this.router.navigate(['/pdp', product.id]);
  }
}
