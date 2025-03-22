import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdottiService } from '../../services/prodotti.service';
import { AuthappService } from '../../services/authapp.service';
import { environment } from '../../../environments/environment';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.css']
})
export class PdpComponent implements OnInit {
  private _actualMainImage: number = 0;
  @ViewChild('mainVideo') mainVideo!: ElementRef<HTMLVideoElement>;
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

  videoDuration: number = 0;
  videoTime: number = 0;
  videoFrame: number = 0;  // Variabile per lo slider (frame corrente)

  // Prodotti correlati
  public relatedProducts: ProdottiFull[] = [];
  selectedSize: string | null = null;
  isInfoVisible: { [key: string]: boolean } = {
    sizeFit: false,
    shipping: false,
    reviews: false,
    moreInfo: false
  };

  showCartPopup: boolean = false;
  addedProductName: string = '';
  popupTimer: any;

  constructor(
    private prodottiService: ProdottiService,
    private auth: AuthappService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {
    const totalTaglie: string[] = [
      '35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40',
      '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5'
    ];
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

  get actualMainImage(): number {
    return this._actualMainImage;
  }

  setMainImage(index: number): void {
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
          const tmpProd = data.message as ProdottiFull;
          this.actualProductSelected = tmpProd;
          this.urlListProductToUpdate = tmpProd.url;
          this.colorNameSelected = tmpProd.nome_colore;
          
          // Reset quantità taglie
          this.taglie.forEach(item => item.quantita = 0);
          for (const taglia of tmpProd.taglieProdotto) {
            let i = 0;
            while (i < this.taglie.length && this.taglie[i].taglia !== taglia.taglia.taglia_Eu) {
              i++;
            }
            if (i < this.taglie.length) {
              this.taglie[i].quantita += taglia.taglia_prodotti.quantita;
            }
          }
          
          // Carica prodotti correlati
          this.prodottiService.getProdotti().subscribe({
            next: (data: ServerResponse) => {
              const allProducts = data.message as ProdottiFull[];
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

  createUrlByString(filename: string): string {
    return `${environment.serverUrl}/${filename}`;
  }

  isTagliaAvailable(taglia: string): boolean {
    const available = this.taglie.find(item => item.taglia === taglia);
    return available ? available.quantita > 0 : false;
  }

  selectSize(size: string) {
    this.selectedSize = size;
    console.log(`Taglia selezionata: ${size}`);
  }

  addToCart() {
    if (this.selectedSize && this.actualProductSelected) {
      this.cartService.addProduct(this.actualProductSelected, this.selectedSize);
      this.addedProductName = this.actualProductSelected.nome_modello;
      this.showCartPopup = true;
      if (this.popupTimer) { clearTimeout(this.popupTimer); }
      this.popupTimer = setTimeout(() => {
        this.showCartPopup = false;
      }, 5000);
    }
  }

  addToFavorites() {
    if (this.selectedSize) {
      // Logica per aggiungere ai preferiti
    }
  }

  toggleInfo(info: string) {
    this.isInfoVisible[info] = !this.isInfoVisible[info];
  }

  selectRelatedProduct(product: ProdottiFull): void {
    this.router.navigate(['/pdp', product.id]);
  }

  closePopup(): void {
    this.showCartPopup = false;
    if (this.popupTimer) { clearTimeout(this.popupTimer); }
  }

  vaiAlCarrello(): void {
    this.router.navigate(['/cart']);
    this.closePopup();
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
    this.closePopup();
  }

  onLoadedMetadata(): void {
    this.videoDuration = this.mainVideo.nativeElement.duration;
  }

  onTimeUpdate(): void {
    this.videoTime = this.mainVideo.nativeElement.currentTime;
    // Aggiorna lo slider in base al tempo corrente del video
    const frameDuration = this.videoDuration / 36;
    this.videoFrame = Math.floor(this.videoTime / frameDuration);
  }

  onSliderChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.videoFrame = Number(input.value); // valore compreso tra 0 e 35
    const frameDuration = this.videoDuration / 36;
    const newTime = this.videoFrame * frameDuration;
    this.mainVideo.nativeElement.currentTime = newTime;
    this.videoTime = newTime;
  }
  
  // Verifica se l'URL è un video (basato sull'estensione)
  isVideo(url: string): boolean {
    return url ? url.toLowerCase().endsWith('.mp4') : false;
  }

  pauseVideo(video: HTMLVideoElement): void {
    setTimeout(() => {
      video.pause();
    }, 100); // Attende un breve momento per garantire che il primo frame venga caricato
  }
  
  preventVideoOpen(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }
  
  
}
