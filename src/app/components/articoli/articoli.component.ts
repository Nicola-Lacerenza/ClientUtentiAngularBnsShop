import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { AuthappService } from '../../services/authapp.service';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GestioneImmaginiService } from '../../services/gestione-immagini.service';
import { Observable } from 'rxjs';

interface ProductGroup {
  modello: string;
  prodotti: { immagini: string[]; prodotto: ProdottiFull }[];
  currentImage: string;        
  currentProductId: number;
}

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {
  public _prodotti: { immagini: string[]; prodotto: ProdottiFull }[] = [];
  public prodottiFiltrati: ProductGroup[] = [];
  public generi: string[] = [];
  public taglie: string[] = [];
  public colori: string[] = [];
  public brands: string[] = [];
  public categorie: string[] = [];
  public expandedGroups: Record<string, boolean> = {};
  public showFilters = false;

  constructor(
    private prodottiService: ProdottiService,
    private auth: AuthappService,
    private router: Router,
    private gestioneImmagini: GestioneImmaginiService
  ) {}

  ngOnInit(): void {
    this.getProdotti();
  }

  private getProdotti(): void {
    this.prodottiService.getProdotti().subscribe({
      next: (data: ServerResponse) => {
        const tmp = data.message as ProdottiFull[];
        tmp.forEach(pf => {
          let es = this._prodotti.find(x => x.prodotto.id === pf.id);
          if (!es) {
            es = { immagini: [], prodotto: pf };
            this._prodotti.push(es);
          }
          es.immagini.push(pf.url[0]);
        });
        this._prodotti = this._prodotti.filter(
          x => x.prodotto.stato_pubblicazione === 1
        );
        const grouped: Record<string, typeof this._prodotti> = {};
        this._prodotti.forEach(item => {
          const idMod = item.prodotto.id_modello.toString();
          if (!grouped[idMod]) grouped[idMod] = [];
          grouped[idMod].push(item);
        });
        this.prodottiFiltrati = Object.keys(grouped).map(idMod => ({
          modello: grouped[idMod][0].prodotto.nome_modello,
          prodotti: grouped[idMod],
          currentImage: grouped[idMod][0].immagini[0],
          currentProductId: grouped[idMod][0].prodotto.id
        }));
        this._prodotti.forEach(item => {
          if (!this.categorie.includes(item.prodotto.nome_categoria)) {
            this.categorie.push(item.prodotto.nome_categoria);
          }
          if (!this.brands.includes(item.prodotto.nome_brand)) {
            this.brands.push(item.prodotto.nome_brand);
          }
          if (
            item.prodotto.target &&
            !this.generi.includes(item.prodotto.target)
          ) {
            this.generi.push(item.prodotto.target);
          }
          item.prodotto.nome_colore.forEach(c => {
            if (!this.colori.includes(c)) this.colori.push(c);
          });
          item.prodotto.taglieProdotto.forEach(tp => {
            const tg = tp.taglia.taglia_Eu;
            if (!this.taglie.includes(tg)) this.taglie.push(tg);
          });
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          this.auth.doLogout();
        } else {
          console.error(err);
        }
      }
    });
  }

  public ApplicaFiltri(form: NgForm): void {
    const f = form.value;
    let filtered = [...this._prodotti];
    // Logiche di filtro…
    const grp: Record<string, { immagini: string[]; prodotto: ProdottiFull }[]> = {};
    filtered.forEach(item => {
      const idM = item.prodotto.id_modello.toString();
      if (!grp[idM]) grp[idM] = [];
      grp[idM].push(item);
    });
    this.prodottiFiltrati = Object.keys(grp).map(idM => ({
      modello: grp[idM][0].prodotto.nome_modello,
      prodotti: grp[idM],
      currentImage: grp[idM][0].immagini[0],
      currentProductId: grp[idM][0].prodotto.id
    }));
  }

  public generateUrl(fileName: string): string {
    return `${environment.serverUrl}/${fileName}`;
  }

  public getImageUrl(name: string): Observable<string | undefined> {
    return this.gestioneImmagini.getUrlImmagine(name);
  }

  public generateThumbnailUrl(mediaName: string): string {
    const url = this.generateUrl(mediaName);
    return url.replace(/\.(mp4|webm|ogg)$/i, '.jpg');
  }

  public changeMainImage(
    group: ProductGroup,
    newFile: string,
    pid: number
  ): void {
    group.currentImage = newFile;
    group.currentProductId = pid;
  }

  public isVideo(url: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(url);
  }

  public playVideo(event: MouseEvent): void {
    const v = event.target as HTMLVideoElement;
    v.play();
  }

  public pauseVideo(event: MouseEvent): void {
    const v = event.target as HTMLVideoElement;
    v.pause();
    v.currentTime = 0;
  }

  public toggleGroup(group: string): void {
    this.expandedGroups[group] = !this.expandedGroups[group];
  }

  public isGroupExpanded(group: string): boolean {
    return !!this.expandedGroups[group];
  }

  public toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  public viewProduct(id: number): void {
    this.router.navigateByUrl(`/pdp/${id}`);
  }
}