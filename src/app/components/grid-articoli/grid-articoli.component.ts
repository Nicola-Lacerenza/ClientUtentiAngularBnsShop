import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthappService } from '../../services/authapp.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ProdottiFull } from '../../models/prodottiFull.interface';

@Component({
  selector: 'app-grid-articoli',
  templateUrl: './grid-articoli.component.html',
  styleUrls: ['./grid-articoli.component.css']
})
export class GridArticoliComponent implements OnInit {
  public _prodotti: { immagini: string[], prodotto: ProdottiFull }[] = [];
  public currentImageIndex: { [id: number]: number } = {};

  constructor(
    private prodottiService: ProdottiService,
    private auth: AuthappService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProdotti();
  }

  private getProdotti(): void {
    this.prodottiService.getProdotti().subscribe({
      next: (data: ServerResponse) => {
        console.log("data", data);
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
        console.log("prodotti", this._prodotti);
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

  public generateUrl(filename: string): string {
    return `${environment.serverUrl}/${filename}`;
  }

  public prevImage(productId: number, totalImages: number): void {
    if (this.currentImageIndex[productId] === undefined) {
      this.currentImageIndex[productId] = 0;
    }
    this.currentImageIndex[productId] = 
      (this.currentImageIndex[productId] - 1 + totalImages) % totalImages;
  }

  public nextImage(productId: number, totalImages: number): void {
    if (this.currentImageIndex[productId] === undefined) {
      this.currentImageIndex[productId] = 0;
    }
    this.currentImageIndex[productId] = 
      (this.currentImageIndex[productId] + 1) % totalImages;
  }

  // Funzione per determinare se il file corrente è un video (controlla l'estensione)
  public isVideo(fileName: string): boolean {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
  }

  handleEdit(id: number): void {
    this.router.navigateByUrl(`/addProduct/${id}`);
  }
  
  handleDelete(id: number): void {
    console.log('Elimina prodotto con ID:', id);
    this.prodottiService.deleteProdotti(id).subscribe({
      next: (data: ServerResponse) => {
        console.log(data);
        this._prodotti = this._prodotti.filter(prodotto => prodotto.prodotto.id !== id);
        console.log('Prodotti aggiornati:', this._prodotti);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Errore durante l\'eliminazione del prodotto:', error);
      }
    });
  }
}
