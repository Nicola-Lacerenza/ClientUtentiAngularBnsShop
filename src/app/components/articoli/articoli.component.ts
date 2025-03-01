import { Component, OnInit } from '@angular/core'
import { ProdottiService } from '../../services/prodotti.service';
import { AuthappService } from '../../services/authapp.service';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { Router } from '@angular/router';
import { FormBuilder, NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {
  public _prodotti: { immagini: string[], prodotto: ProdottiFull }[] = [];
  public prodottiFiltrati: { immagini: string[], prodotto: ProdottiFull }[] = [];


  public currentImageIndex: { [id: number]: number } = {}; // Stato dell'immagine corrente per ogni prodotto

  tutteLeCategorie: string[] = ["Elettronica", "Abbigliamento", "Casa", "Giardino"];
  showThumbnails: { [key: string]: boolean } = {}; // Oggetto per gestire lo stato delle miniature
  generi: string[] = ["Uomo", "Donna", "Unisex"];
  taglie: string[] = Array.from({ length: 12 }, (_, i) => (35 + i).toString());
  colori: string[] = ["Rosso", "Blu", "Verde", "Nero", "Bianco"];
  brands: string[] = ["Nike", "Adidas", "Puma", "Reebok", "New Balance"];
  expandedGroups: { [key: string]: boolean } = {};

  constructor(   
    private prodottiService: ProdottiService,
    private auth: AuthappService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProdotti();
  }

  private fetchProdotti(): void {
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
  /* if (target.checked) {
      const prodottiFiltrati1 = this._prodotti.filter(item => item.prodotto.target === genereSelezionato.toUpperCase());
      for (let i = 0; i < prodottiFiltrati1.length; i++) {
        let j=0;
        while(j<this.prodottiFiltrati.length && this.prodottiFiltrati[j].prodotto.id !== prodottiFiltrati1[i].prodotto.id){
          j++;
        }
        if(j >= this.prodottiFiltrati.length){
          this.prodottiFiltrati.push(prodottiFiltrati1[i]);
        }
      }
    } else {
      const prodottiFiltrati1 = this._prodotti.filter(item => item.prodotto.target === genereSelezionato.toUpperCase());
      for (let i = 0; i < prodottiFiltrati1.length; i++) {
        let j=0;
        while(j<this.prodottiFiltrati.length && this.prodottiFiltrati[j].prodotto.id !== prodottiFiltrati1[i].prodotto.id){
          j++;
        }
        if(j < this.prodottiFiltrati.length){
          this.prodottiFiltrati.splice(j, 1); 
        }
      }
    }
  }

  public selectPrezzo(prezzoSelezionato : number, mode:boolean , event: Event): void {
    const prezzo = <HTMLInputElement>event.target;
    if (prezzo.checked) {
      let prodottiFiltrati1;
      if(mode){
        prodottiFiltrati1 = this._prodotti.filter(item => item.prodotto.prezzo <= prezzoSelezionato);
      } else {
        prodottiFiltrati1 = this._prodotti.filter(item => item.prodotto.prezzo >= prezzoSelezionato);
      }
      for (let i = 0; i < prodottiFiltrati1.length; i++) {
        let j=0;
        while(j<this.prodottiFiltrati.length && this.prodottiFiltrati[j].prodotto.id !== prodottiFiltrati1[i].prodotto.id){
          j++;
        }
        if(j >= this.prodottiFiltrati.length){
          this.prodottiFiltrati.push(prodottiFiltrati1[i]);
        }
      }
    } else {
      let prodottiFiltrati1;
      if(mode){
        prodottiFiltrati1 = this._prodotti.filter(item => item.prodotto.prezzo <= prezzoSelezionato);
      } else {
        prodottiFiltrati1 = this._prodotti.filter(item => item.prodotto.prezzo >= prezzoSelezionato);
      }
      for (let i = 0; i < prodottiFiltrati1.length; i++) {
        let j=0;
        while(j<this.prodottiFiltrati.length && this.prodottiFiltrati[j].prodotto.id !== prodottiFiltrati1[i].prodotto.id){
          j++;
        }
        if(j < this.prodottiFiltrati.length){
          this.prodottiFiltrati.splice(j, 1); 
        }
      }
    }*/
   console.log(form);
   
  }



  public selectTaglia(tagliaSelezionata : string , event: Event): void {
    const taglia = <HTMLInputElement>event.target;
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
