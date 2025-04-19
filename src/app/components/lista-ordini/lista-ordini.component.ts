import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { OrdineService } from '../../services/ordine.service';
import { ResoService }    from '../../services/reso.service';
import { Ordine }         from '../../models/ordine.interface';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-ordini',
  templateUrl: './lista-ordini.component.html',
  styleUrls: ['./lista-ordini.component.css']
})
export class ListaOrdiniComponent implements OnInit {
  ordini: Ordine[] = [];

  // Modal reso
  showResoModal = false;
  selectedOrder!: Ordine;
  resoForm!: FormGroup;

  constructor(
    private ordineService: OrdineService,
    private router : Router,
    private route: ActivatedRoute   // ← aggiungi questo

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

  goToResoPage(idOrdine: number) {
    this.router.navigate(['/member/reso', idOrdine]);
  }
}