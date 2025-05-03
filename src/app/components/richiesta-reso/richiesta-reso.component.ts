import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdineService } from '../../services/ordine.service';
import { ResoService } from '../../services/reso.service';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { Ordine } from '../../models/ordine.interface';
import { environment } from '../../../environments/environment';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { Reso } from '../../models/reso.interface';

@Component({
  selector: 'app-richiesta-reso',
  templateUrl: './richiesta-reso.component.html',
  styleUrl: './richiesta-reso.component.css'
})
export class RichiestaResoComponent {
  ordine!: Ordine;
  motivo: string = '';
  prodottiSelezionati: number[] = [];
  quantitaSelezionata: Record<number, number> = {};


  constructor(
    private route: ActivatedRoute,
    private ordineService: OrdineService,
    private resoService: ResoService,
  ) { }

  ngOnInit(): void {
    this.getOrdine();
  }

  
  toggleProdotto(idProdotto: number, event: Event) {
    const input = event.target as HTMLInputElement;
  
    if (input.checked) {
      this.prodottiSelezionati.push(idProdotto);
    } else {
      this.prodottiSelezionati = this.prodottiSelezionati.filter(id => id !== idProdotto);
    }
  }
  
  submitReso() {
    if (this.prodottiSelezionati.length === 0) {
      alert('Seleziona almeno un prodotto da restituire.');
      return;
    }
  
    const richieste : Reso[] = [];
    /*for (const idProdotto of this.prodottiSelezionati) {
      const richiestaReso : Reso = {
        id_ordine: this.ordine.id,
        id_prodotto: idProdotto,
        motivo: this.motivo,
        quantita: this.quantitaSelezionata[idProdotto] || 1, // Default to 1 if not specified
        stato_reso: 'in attesa',
        data_richiesta: new Date(),
        id_taglia 

      };
  
      richieste.push(richiestaReso);

    }
   
  
    /*this.resoService.inviaRichiestaReso(richieste).subscribe({
      next: response => {
        alert("Richiesta di reso inviata con successo!");
      },
      error: err => {
        console.error("Errore nell'invio del reso", err);
      }
    });*/
  }
  
  
  private getOrdine() {
    const idOrdine = Number(this.route.snapshot.paramMap.get('id'));

    this.ordineService.getOrdine(idOrdine).subscribe({
      next: (data:ServerResponse) => {
        this.ordine = <Ordine>data.message;
        console.log(this.ordine);
      },
      error: (error) => {
        console.error('Errore nel recupero degli ordini:', error);
      }
    });
  }

  public generateUrl(filename: string): string {
    return `${environment.serverUrl}/${filename}`;
  }

  getDisponibilita(prodotto: ProdottiFull): number {
    const wrapper = prodotto.taglieProdotto.find(tp => tp.taglia_prodotti.id_prodotto === prodotto.id);
    return wrapper?.taglia_prodotti.quantita ?? 1;
  }

  getRange(max: number): number[] {
    return Array.from({ length: max }, (_, i) => i + 1);
  }

  isSelected(id: number): boolean {
    return this.prodottiSelezionati.includes(id);
  }

}
