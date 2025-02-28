import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ProdottiService } from '../../services/prodotti.service';
import { AuthappService } from '../../services/authapp.service';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { environment } from '../../../environments/environment';

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
  public prodottiUomo: { immagini: string[], prodotto: ProdottiFull }[] = [];
  public prodottiDonna: { immagini: string[], prodotto: ProdottiFull }[] = [];
  public prodottiBambino: { immagini: string[], prodotto: ProdottiFull }[] = [];

  constructor(
    private route:ActivatedRoute,
    private prodottiService: ProdottiService,
    private auth: AuthappService
  ){}

  ngOnInit(): void {
    
    this.utente= this.route.snapshot.params['userId'];
    this.fetchProdotti();

  }

  public generateUrl(filename: string): string {
    return `${environment.serverUrl}/${filename}`;
 }

  private fetchProdotti(): void {
    this.prodottiUomo = [];
  this.prodottiDonna = [];
  this.prodottiBambino = [];
    this.prodottiService.getProdotti().subscribe({
      next: (data: ServerResponse) => {
        console.log(data);
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
        // Filtra solo i prodotti con target "uomo"
        this.prodottiUomo = this._prodotti.filter(item => 
           item.prodotto.target.toLowerCase() === 'uomo' && item.prodotto.stato_pubblicazione === 1
        );
        // Filtra solo i prodotti con target "donna"
        this.prodottiDonna = this._prodotti.filter(item =>
          item.prodotto.target.toLowerCase() === 'donna' && item.prodotto.stato_pubblicazione === 1
        );
        // Filtra solo i prodotti con target "Bambino"  
        this.prodottiBambino = this._prodotti.filter(item =>
          item.prodotto.target.toLowerCase() === 'bambino'&& item.prodotto.stato_pubblicazione === 1
        );
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
