import { Component, OnInit } from '@angular/core'
import { ProdottiService } from '../../services/prodotti.service';
import { AuthappService } from '../../services/authapp.service';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {
  public _prodotti: { immagini: string[], prodotto: ProdottiFull }[] = [];
  public prodottiFiltrati: { immagini: string[], prodotto: ProdottiFull }[] = [];
  public currentImageIndex: { [id: number]: number } = {}; 

  showThumbnails: { [key: string]: boolean } = {};
  generi: string[] = [];
  taglie: string[] = [];
  colori: string[] = [];
  brands: string[] = [];
  tutteLeCategorie: string[] = [];

  expandedGroups: { [key: string]: boolean } = {};

  constructor(   
    private prodottiService: ProdottiService,
    private auth: AuthappService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProdotti();
  }

  private getProdotti(): void {
    this.prodottiService.getProdotti().subscribe({
      next: (data: ServerResponse) => {
        const tmp: ProdottiFull[] = <ProdottiFull[]>data.message;
        tmp.forEach(attuale => {
          if (!this._prodotti.find(p => p.prodotto.id === attuale.id)) {
            this._prodotti.push({ immagini: [], prodotto: attuale });
          }
        });

        tmp.forEach(attuale => {
          const prodotto = this._prodotti.find(p => p.prodotto.id === attuale.id);
          if (prodotto) prodotto.immagini.push(attuale.url[0]);
        });
        this._prodotti = this._prodotti.filter(item => 
          item.prodotto.stato_pubblicazione === 1
       );
        this.prodottiFiltrati =this._prodotti;

    // GESTIONE FILTRI
        this._prodotti.forEach(item => {
          const categoria = item.prodotto.nome_categoria;
          if (!this.tutteLeCategorie.includes(categoria)) {
            this.tutteLeCategorie.push(categoria);
          }
          const brand = item.prodotto.nome_brand;
          if (!this.brands.includes(brand)) {
            this.brands.push(brand);
          }
          const target = item.prodotto.target;
          if (target && !this.generi.includes(target)) {
            this.generi.push(target);
          }
          item.prodotto.nome_colore.forEach(colore => {
            if (!this.colori.includes(colore)) {
              this.colori.push(colore);
            }
          });
          item.prodotto.taglieProdotto.forEach(tp => {
            const taglia = tp.taglia.taglia_Eu; // Assumiamo che sia così
            if (!this.taglie.includes(taglia)) {
              this.taglie.push(taglia);
            }
          });
        });
        
        console.log("prodotti", this.prodottiFiltrati);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.auth.doLogout();
        } else {
          console.error(error);
        }
      }
    });
  }

  public ApplicaFiltri(form : NgForm): void {
    const filters = form.value;
  
    let filteredProducts = this._prodotti.slice();
    // --- Filtro per Genere ---
    const selectedGeneri = this.generi
    .filter(genere => filters[genere])
    .map(genere => genere.toUpperCase());
    console.log(selectedGeneri.length);
    if (selectedGeneri.length > 0) {
      filteredProducts = filteredProducts.filter(item =>
        selectedGeneri.includes(item.prodotto.target.toUpperCase())
      );
    }
    // --- Filtro per Prezzo ---
    if (filters.prezzoInferiore) {
      filteredProducts = filteredProducts.filter(item =>
        item.prodotto.prezzo <= filters.prezzoInferiore
      );
    }
    if (filters.prezzoSuperiore) {
      filteredProducts = filteredProducts.filter(item =>
        item.prodotto.prezzo >= filters.prezzoSuperiore
      );
    }
    // --- Filtro per Taglia ---
    const selectedTaglie = this.taglie.filter(taglia => filters[taglia]);
    if (selectedTaglie.length > 0) {
      filteredProducts = filteredProducts.filter(item =>
        item.prodotto.taglieProdotto.some(tp =>
          selectedTaglie.includes(tp.taglia.taglia_Eu)
        )
      );
    }
    // --- Filtro per Colore ---
    const selectedColori = this.colori
      .filter(colore => filters[colore])
      .map(colore => colore.toUpperCase());
    if (selectedColori.length > 0) {
      filteredProducts = filteredProducts.filter(item =>
        item.prodotto.nome_colore.some(color => selectedColori.includes(color.toUpperCase()))
      );
    }
    // --- Filtro per Categoria ---
    const selectedCategorie = this.tutteLeCategorie
      .filter(categoria => filters[categoria])
      .map(categoria => categoria.toUpperCase());
    if (selectedCategorie.length > 0) {
      filteredProducts = filteredProducts.filter(item =>
        selectedCategorie.includes(item.prodotto.nome_categoria.toUpperCase())
      );
    }
    // --- Filtro per Brand ---
    const selectedBrands = this.brands
      .filter(brand => filters[brand])
      .map(brand => brand.toUpperCase());
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter(item =>
        selectedBrands.includes(item.prodotto.nome_brand.toUpperCase())
      );
    }
      this.prodottiFiltrati = filteredProducts;
  }
  
  public generateUrl(filename: string): string {
    return `${environment.serverUrl}/${filename}`;
  }

  public prevImage(productId: number, totalImages: number): void {
    if (this.currentImageIndex[productId] === undefined) {
      this.currentImageIndex[productId] = 0;
    }
    this.currentImageIndex[productId] = 
      (this.currentImageIndex[productId] - 1 + totalImages) % totalImages;
  }


  // Funzione per mostrare le miniature quando il cursore è sopra la descrizione
  toggleThumbnails(codart: string, isHovered: boolean): void {
    this.showThumbnails[codart] = isHovered; // Imposta true o false
  }

  toggleGroup(group: string): void {
    this.expandedGroups[group] = !this.expandedGroups[group];
  }

  isGroupExpanded(group: string): boolean {
    return this.expandedGroups[group];
  }

  
  viewProduct(id: number): void {
    this.router.navigateByUrl(`/pdp/${id}`);
   }
}
