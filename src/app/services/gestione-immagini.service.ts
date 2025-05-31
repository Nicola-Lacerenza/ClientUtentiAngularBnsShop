import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { HttpRequestService } from './http-request.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerResponse } from '../models/ServerResponse.interface';


@Injectable({
  providedIn: 'root'
})
export class GestioneImmaginiService {
  // Cache degli observable per evitare richieste duplicate
  private cache$ = new Map<string, Observable<string>>();

  constructor(private httpRequest : HttpRequestService) {

  }

  public svuotaMappaImmagini() : void {
    this.urls.clear();
    this.urlsEstratti.next(new Map<string, string | null>(this.urls));
  }

  public getUrlImmagine(nomeFile : string) : Observable<string | undefined> {
    if(!this.urls.has(nomeFile)){
      this.caricaImmagine(nomeFile);
    }
    return this.urlsEstratti.asObservable().pipe(
      map((urls : Map<string,string | null>) => {
        if(urls.has(nomeFile)){
          if(urls.get(nomeFile) !== null){
            return <string>urls.get(nomeFile);
          }else{
            return "";
          }
        }else{
          return undefined;
        }
      }));
  }

  public caricaImmagine(nomeFile : string) : void {
    this.httpRequest.getImmagine(nomeFile).subscribe({
      next : (Immagine: Blob) => {
        const nuovoUrl : string = URL.createObjectURL(Immagine);
        this.urls.set(nomeFile, nuovoUrl);
        this.urlsEstratti.next(new Map<string, string | null>(this.urls));
      },
      error : async (error : HttpErrorResponse) => {
        console.error("Errore nel caricamento dell'immagine: " + error);
        //this.urls.set(nomeFile, null);
        //this.urlsEstratti.next(new Map<string, string | null>(this.urls));
        await this.messaggioErrore(error);
      }
    });
  }

  public async messaggioErrore(error: HttpErrorResponse) : Promise<void> {
    if (error.error instanceof Blob && error.error.type === 'application/json') {
      try {
        const data : string = await error.error.text();
        const jsonData : ServerResponse = JSON.parse(data);
        console.error('Errore:', jsonData);
      }catch(e){
        console.error('Errore:', error);
      }
    }else{
      console.error('Errore:', error);
    }
  }
}
