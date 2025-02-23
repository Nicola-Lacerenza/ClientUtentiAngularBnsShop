import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ProdottiService } from '../../services/prodotti.service';
import { AuthappService } from '../../services/authapp.service';
import { ProdottiFull } from '../../models/prodottiFull.interface';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{

  utente:string="";
  
  titolo : string="Benvenuti in BNS SHOP";

  sottotitolo : string="Visualizza le offerte del giorno";

  public _prodotti: { immagini: string[], prodotto: ProdottiFull }[] = [];


  constructor(
    private route:ActivatedRoute,
    private prodottiService: ProdottiService,
    private auth: AuthappService
  ){}

  ngOnInit(): void {
    
    this.utente= this.route.snapshot.params['userId'];
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


}
