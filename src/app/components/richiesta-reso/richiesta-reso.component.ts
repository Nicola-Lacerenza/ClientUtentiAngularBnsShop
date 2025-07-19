import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdineService } from '../../services/ordine.service';
import { ResoService } from '../../services/reso.service';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { Ordine } from '../../models/ordine.interface';
import { environment } from '../../../environments/environment';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { Reso } from '../../models/reso.interface';
import { GestioneImmaginiService } from '../../services/gestione-immagini.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-richiesta-reso',
  templateUrl: './richiesta-reso.component.html',
  styleUrls: ['./richiesta-reso.component.css']
})
export class RichiestaResoComponent implements OnInit {
  @ViewChild('bottoneCreaReso') bottoneCreaReso!: ElementRef<HTMLButtonElement>;
  ordine!: Ordine;
  motivo: string = '';
  prodottiSelezionati: string[] = [];
  quantitaSelezionata: Record<string, number> = {};

  constructor(
    private route: ActivatedRoute,
    private ordineService: OrdineService,
    private resoService: ResoService,
    private gestioneImmagini : GestioneImmaginiService
  ) {}

  ngOnInit(): void {
    this.getOrdine();
  }

  public getImageUrl(imageName: string): Observable<string | undefined> {
    return this.gestioneImmagini.getUrlImmagine(imageName);
  }
  
  public getTagliaEu(prodotto: ProdottiFull): string {
    return prodotto.taglieProdotto[0]?.taglia.taglia_Eu || '';
  }

  getDisponibilita(prodotto: ProdottiFull): number {
    return prodotto.taglieProdotto[0]?.taglia_prodotti.quantita || 1;
  }

  getRange(max: number): number[] {
    return Array.from({ length: max }, (_, i) => i + 1);
  }

  /** Chiave composita id-taglia-index */
  prodottoKey(prodotto: ProdottiFull, index: number): string {
    return `${prodotto.id}-${this.getTagliaEu(prodotto)}-${index}`;
  }

  /**
   * ARROW FUNCTION per mantenere il contesto di `this` correttamente
   * Angular la chiamerà sempre con il `this` del componente
   */
  trackByProdotto = (index: number, prodotto: ProdottiFull): string =>
    this.prodottoKey(prodotto, index);

  isSelected(key: string): boolean {
    return this.prodottiSelezionati.includes(key);
  }

  toggleProdotto(key: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.prodottiSelezionati.push(key);
    } else {
      this.prodottiSelezionati = this.prodottiSelezionati.filter(k => k !== key);
      delete this.quantitaSelezionata[key];
    }
  }

  submitReso() {

    if (this.prodottiSelezionati.length === 0) {
      alert('Seleziona almeno un prodotto da restituire.');
      return;
    }

    const elencoResi : Reso[] = [];
    for(const prodottoSelezionato of this.prodottiSelezionati){
      const [idStr, tag, idx] = prodottoSelezionato.split('-');
      const quantita : number = this.quantitaSelezionata[prodottoSelezionato];
      const nuovoReso : Reso = {
        id:0,
        ordine: this.ordine,
        id_prodotto : parseInt(idStr),
        numero_taglia : tag,
        data_richiesta : new Date(),
        motivo : this.motivo,
        prezzo_unitario : this.ordine.prodotti[parseInt(idx)].prezzo,
        quantita : quantita,
        valuta : this.ordine.valuta,
        stato_reso : 'IN ATTESA DI APPROVAZIONE',
        data_rimborso : new Date(),
        importo : 0
      };
      elencoResi.push(nuovoReso);
    }
    this.bottoneCreaReso.nativeElement.disabled=true;

    this.resoService.creaReso({body:elencoResi}).subscribe({
      next: (data: ServerResponse) => {
        setTimeout(() => {
          window.history.back();
          }, 2000);      },
      error: (error : HttpErrorResponse) => {
        console.error(error);
              setTimeout(() => {
              }, 3000);
      }
    });
  }

  private getOrdine() {
    const idOrdine = Number(this.route.snapshot.paramMap.get('id'));
    this.ordineService.getOrdine(idOrdine).subscribe({
      next: (data: Ordine) => this.ordine = data,
      error: error => console.error('Errore nel recupero dell\'ordine:', error)
    });
  }
}
