import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { AuthappService } from '../../services/authapp.service';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

interface ProductGroup {
  modello: string;
  prodotti: { immagini: string[], prodotto: ProdottiFull }[];
  currentImage: string;
  currentProductId: number;
}

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {
  // Array originale dei prodotti
  public _prodotti: { immagini: string[], prodotto: ProdottiFull }[] = [];
  // Prodotti filtrati e raggruppati per modello
  public prodottiFiltrati: ProductGroup[] = [];
  public currentImageIndex: { [id: number]: number } = {}; 

  // Filtri ausiliari
  showThumbnails: { [key: string]: boolean } = {};
  generi: string[] = [];
  taglie: string[] = [];
  colori: string[] = [];
  brands: string[] = [];
  tutteLeCategorie: string[] = [];
  modelli: string[] = []; // Lista dei modelli unici

  expandedGroups: { [key: string]: boolean } = {};
  showFilters: boolean = true;
  
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
        // Inserisci ogni prodotto evitando duplicati
        tmp.forEach(attuale => {
          if (!this._prodotti.find(p => p.prodotto.id === attuale.id)) {
            this._prodotti.push({ immagini: [], prodotto: attuale });
          }
        });
        // Aggiungi le immagini (prendiamo la prima URL)
        tmp.forEach(attuale => {
          const prodotto = this._prodotti.find(p => p.prodotto.id === attuale.id);
          if (prodotto) {
            prodotto.immagini.push(attuale.url[0]);
          }
        });

        // Considera solo i prodotti pubblicati
        this._prodotti = this._prodotti.filter(item =>
          item.prodotto.stato_pubblicazione === 1
        );

        // Raggruppa per modello: ogni gruppo contiene tutti i prodotti con lo stesso nome_modello
        const grouped: { [model: string]: { immagini: string[], prodotto: ProdottiFull }[] } = {};
        this._prodotti.forEach(item => {
          const modello = item.prodotto.nome_modello;
          if (!grouped[modello]) {
            grouped[modello] = [];
          }
          grouped[modello].push(item);
        });
        this.prodottiFiltrati = Object.keys(grouped).map(modello => ({
          modello: modello,
          prodotti: grouped[modello],
          currentImage: this.generateUrl(grouped[modello][0].immagini[0]),
          currentProductId: grouped[modello][0].prodotto.id
        }));
        this.modelli = Object.keys(grouped);

        // Gestione dei filtri per le altre proprietà
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
            const taglia = tp.taglia.taglia_Eu;
            if (!this.taglie.includes(taglia)) {
              this.taglie.push(taglia);
            }
          });
        });
        
        console.log("Prodotti raggruppati per modello:", this.prodottiFiltrati);
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

  public ApplicaFiltri(form: NgForm): void {
    const filters = form.value;
  
    let filteredProducts = this._prodotti.slice();
    // --- Filtro per Genere ---
    const selectedGeneri = this.generi.filter(genere => filters[genere]).map(genere => genere.toUpperCase());
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
    const selectedColori = this.colori.filter(colore => filters[colore]).map(colore => colore.toUpperCase());
    if (selectedColori.length > 0) {
      filteredProducts = filteredProducts.filter(item =>
        item.prodotto.nome_colore.some(color => selectedColori.includes(color.toUpperCase()))
      );
    }
    // --- Filtro per Categoria ---
    const selectedCategorie = this.tutteLeCategorie.filter(categoria => filters[categoria]).map(categoria => categoria.toUpperCase());
    if (selectedCategorie.length > 0) {
      filteredProducts = filteredProducts.filter(item =>
        selectedCategorie.includes(item.prodotto.nome_categoria.toUpperCase())
      );
    }
    // --- Filtro per Brand ---
    const selectedBrands = this.brands.filter(brand => filters[brand]).map(brand => brand.toUpperCase());
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter(item =>
        selectedBrands.includes(item.prodotto.nome_brand.toUpperCase())
      );
    }
    // --- Filtro per Modello ---
    const selectedModelli = this.modelli.filter(modello => filters[modello]).map(modello => modello.toUpperCase());
    if (selectedModelli.length > 0) {
      filteredProducts = filteredProducts.filter(item =>
        selectedModelli.includes(item.prodotto.nome_modello.toUpperCase())
      );
    }
    
    // Raggruppa i prodotti filtrati per modello e aggiorna l'immagine principale
    const grouped: { [model: string]: { immagini: string[], prodotto: ProdottiFull }[] } = {};
    filteredProducts.forEach(item => {
      const modello = item.prodotto.nome_modello;
      if (!grouped[modello]) {
        grouped[modello] = [];
      }
      grouped[modello].push(item);
    });
    this.prodottiFiltrati = Object.keys(grouped).map(modello => ({
      modello: modello,
      prodotti: grouped[modello],
      currentImage: this.generateUrl(grouped[modello][0].immagini[0]),
      currentProductId: grouped[modello][0].prodotto.id
    }));
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

  // Al passaggio del mouse su una miniatura aggiorna l'immagine principale del gruppo e memorizza l'id
  public changeMainImage(group: ProductGroup, newImage: string, productId: number): void {
    group.currentImage = newImage;
    group.currentProductId = productId;
  }

  toggleThumbnails(codart: string, isHovered: boolean): void {
    this.showThumbnails[codart] = isHovered;
  }

  toggleGroup(group: string): void {
    this.expandedGroups[group] = !this.expandedGroups[group];
  }

  isGroupExpanded(group: string): boolean {
    return this.expandedGroups[group];
  }
  
  // Cliccando sul contenitore del gruppo, apriamo la pagina con l'id del prodotto attualmente selezionato
  viewProduct(id: number): void {
    this.router.navigateByUrl(`/pdp/${id}`);
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
