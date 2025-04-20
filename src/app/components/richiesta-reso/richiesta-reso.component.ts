import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdineService } from '../../services/ordine.service';
import { ResoService } from '../../services/reso.service';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { Ordine } from '../../models/ordine.interface';

@Component({
  selector: 'app-richiesta-reso',
  templateUrl: './richiesta-reso.component.html',
  styleUrl: './richiesta-reso.component.css'
})
export class RichiestaResoComponent {
  ordine!: Ordine;


  constructor(
    private route: ActivatedRoute,
    private ordineService: OrdineService,
    private resoService: ResoService,
  ) { }

  ngOnInit(): void {
    this.getOrdine();
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

}
