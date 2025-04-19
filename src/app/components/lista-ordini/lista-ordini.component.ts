import { Component, OnInit } from '@angular/core';
import { OrdineService } from '../../services/ordine.service';
import { Ordine } from '../../models/ordine.interface';
import { ServerResponse } from '../../models/ServerResponse.interface';

@Component({
  selector: 'app-lista-ordini',
  templateUrl: './lista-ordini.component.html',
  styleUrl: './lista-ordini.component.css'
})
export class ListaOrdiniComponent implements OnInit {

  ordini: Ordine[] = [];


  constructor(
    private ordineService : OrdineService,
  ) { }

   ngOnInit(): void {
     this.getOrdini();
   }

   private getOrdini() {
    this.ordineService.getOrdini().subscribe({
      next: (data:ServerResponse) => {
        this.ordini = <Ordine[]>data.message;
      },
      error: (error) => {
        console.error('Errore nel recupero degli ordini:', error);
      }
    });
  }

  effettuaReso(idOrdine: number) {
    // qui la chiamata al servizio per gestire il reso
    console.log('Richiesto reso per ordine', idOrdine);
  }
}
