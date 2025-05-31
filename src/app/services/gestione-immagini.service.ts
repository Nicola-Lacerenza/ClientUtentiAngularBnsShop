import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class GestioneImmaginiService {
  // Cache degli observable per evitare richieste duplicate
  private cache$ = new Map<string, Observable<string>>();

  constructor(private httpRequest: HttpRequestService) {}

  getUrlImmagine(nomeFile: string): Observable<string> {
    if (!this.cache$.has(nomeFile)) {
      const obs$ = this.httpRequest.getImmagine(nomeFile).pipe(
        map((blob: Blob) => URL.createObjectURL(blob)),
        catchError(err => {
          console.error(`Errore caricamento immagine ${nomeFile}:`, err);
          return of(''); // o valore di fallback
        }),
        shareReplay(1)
      );
      this.cache$.set(nomeFile, obs$);
    }
    return this.cache$.get(nomeFile)!;
  }

  /**
   * Svuota completamente la cache.
   */
  clearCache(): void {
    this.cache$.forEach((obs$, key) => {
      this.cache$.delete(key);
    });
  }
}

