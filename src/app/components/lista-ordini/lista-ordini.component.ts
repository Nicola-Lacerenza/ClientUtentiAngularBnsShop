import { Component, OnInit } from '@angular/core';
import { OrdineService } from '../../services/ordine.service';

@Component({
  selector: 'app-lista-ordini',
  templateUrl: './lista-ordini.component.html',
  styleUrl: './lista-ordini.component.css'
})
export class ListaOrdiniComponent implements OnInit {
   constructor(
    private ordineService : OrdineService,
   ) { }

   ngOnInit(): void {
     this.getOrdini();
   }

   private getOrdini() {
    this.ordineService.getOrdini().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error('Errore nel recupero degli ordini:', error);
      }
    });
  }
}
