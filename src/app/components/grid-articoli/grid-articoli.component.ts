import { Component,OnInit } from '@angular/core';
import { ArticoliService } from '../../services/articoli.service';
import { IArticoli } from '../../models/Articoli';
import { ProdottiService } from '../../services/prodotti.service';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { Prodotti } from '../../models/prodotti.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthappService } from '../../services/authapp.service';

@Component({
  selector: 'app-grid-articoli',
  templateUrl: './grid-articoli.component.html',
  styleUrl: './grid-articoli.component.css'
})
export class GridArticoliComponent implements OnInit {

  articoli$ : IArticoli[] = [];
  private _prodotti: Prodotti[] = [];


  constructor(
    private articoliService: ArticoliService,
    private prodottiService: ProdottiService,
    private auth : AuthappService,
  ){}

  ngOnInit(): void {
    
    this.articoli$ = this.articoliService.getArticoli();
    console.log(this.articoli$);

    this.prodottiService.getProdotti().subscribe({
      next: (data: ServerResponse) => {
        this._prodotti = <Prodotti[]>data.message;
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

  handleEdit = (codart : string) => {
    console.log("Cliccato tasto modifica del codice" + codart);
  }

  handleDelete = (codart : string) => {
    console.log("Cliccato tasto elimina del codice" + codart);

    this.articoli$.splice(this.articoli$.findIndex(x => x.codart === codart),1);
    console.log(this.articoli$);
  }
}
