import { Component, OnInit } from '@angular/core';
import { ArticoliService } from '../../services/articoli.service';
import { IArticoli } from '../../models/Articoli';
import { ProdottiService } from '../../services/prodotti.service';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { Prodotti } from '../../models/prodotti.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthappService } from '../../services/authapp.service';
import { environment } from '../../../environments/environment';
import { Immagini } from './../../models/immagini.interface';

@Component({
  selector: 'app-grid-articoli',
  templateUrl: './grid-articoli.component.html',
  styleUrls: ['./grid-articoli.component.css'] // Corretto
})
export class GridArticoliComponent implements OnInit {

  public articoli$: IArticoli[] = [];
  public _prodotti: {immagini:string[],prodotto:Prodotti}[] = [];

  constructor(
    private articoliService: ArticoliService,
    private prodottiService: ProdottiService,
    private auth: AuthappService
  ) {}

  ngOnInit(): void {
    this.fetchArticoli();
    this.fetchProdotti();
  }

  private fetchArticoli(): void {
    this.articoli$ = this.articoliService.getArticoli();
    console.log('Articoli:', this.articoli$);
  }

  private fetchProdotti(): void {
    this.prodottiService.getProdotti().subscribe({ 
      next: (data: ServerResponse) => {
        console.log('Risposta ricevuta dal server:', data);
        const tmp : Prodotti[] = <Prodotti[]>data.message; 
        for(let i = 0;i<tmp.length;i++){
          const attuale : Prodotti=tmp[i];
          let j = 0;
          while(j<this._prodotti.length && this._prodotti[j].prodotto.id !== attuale.id){
            j++;
          }
          //let k;
          if (j>= this._prodotti.length){
            this._prodotti.push({immagini:[],prodotto:attuale})
          }
        }
        for(let i = 0;i<tmp.length;i++){
          const attuale : Prodotti=tmp[i];
          let j = 0;
          while(j<this._prodotti.length && this._prodotti[j].prodotto.id !== attuale.id){
            j++;
          }
          this._prodotti[j].immagini.push(attuale.url);
        }
        console.log('Prodotti:', this._prodotti);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.auth.doLogout();
        } else {
          console.error('Errore:', error);
        }
      }
    });
  }

  public generateUrl(filename : string):string{
      return environment.serverUrl+"/"+filename;
  }


  handleEdit(id: number): void {
    console.log('Modifica prodotto con ID:', id);
  }

  handleDelete(id: number): void {
    console.log('Elimina prodotto con ID:', id);
    this.prodottiService.deleteProdotti(id).subscribe({
      next:(data:ServerResponse) => {
        console.log(data);
      },
      error:(error:HttpErrorResponse) =>{
        console.error(error);
      }
    });
    //this._prodotti = this._prodotti.filter(prodotto => prodotto.prodotto.id !== id);
    console.log('Prodotti aggiornati:', this._prodotti);
  }
}
