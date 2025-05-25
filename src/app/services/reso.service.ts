import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { ServerRequest } from '../models/ServerRequest.interface';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { Observable, map, of } from 'rxjs';
import { Reso_Ricevuto_Server } from '../models/reso_ricevuto_server.interface';
import { Reso } from '../models/reso.interface';
import { OrdineService } from './ordine.service';
import { Ordine } from '../models/ordine.interface';

@Injectable({
  providedIn: 'root'
})
export class ResoService {

  constructor(
    private httprequest:HttpRequestService,
    private ordineService :OrdineService
  ) { }

    public creaReso(body:ServerRequest):Observable<ServerResponse>{
      return this.httprequest.postRequest(environment.serverUrl + "/ResiServlet",body)
    }

    public getReso(id:number):Observable<ServerResponse>{
      return this.httprequest.getRequest(environment.serverUrl + "/ResiServlet?id="+id);
    }

    public getResi(): Observable<Reso[]>{
      return this.httprequest.getRequest(environment.serverUrl + "/ResiServlet").pipe(
        map((data:ServerResponse) => {
          const tmp:Reso_Ricevuto_Server[] = <Reso_Ricevuto_Server[]>data.message;
          const resi:Reso[] = [];
          for(let i = 0; i < tmp.length; i++){
            resi.push(this.convertServerResponseToReso(tmp[i]));
          }
          return resi;
        })
      );
    }


    private convertServerResponseToReso(reso:Reso_Ricevuto_Server):Reso{
      /*const ordine1 : ServerResponse = this.ordineService.getOrdine(reso.id_ordine)
        .subscribe({
          next: (response: ServerResponse) => {
            return response.message as Ordine;
          },
          error: (error: any) => {
            console.error('Errore durante il recupero dell\'ordine:', error);
            return null; // O gestisci l'errore come preferisci
          }
        });*/
      return {
          id : reso.id,
          id_ordine : reso.id_ordine,
          id_prodotto : reso.id_prodotto,
          numero_taglia : reso.numero_taglia, 
          data_richiesta : new Date(
            reso.data_richiesta.year,
            reso.data_richiesta.month - 1,
            reso.data_richiesta.day,
            reso.data_richiesta.hour,
            reso.data_richiesta.minute,
            reso.data_richiesta.second,
            reso.data_richiesta.millisecond
          ),
          data_rimborso : new Date(
            reso.data_rimborso.year,
            reso.data_rimborso.month - 1,
            reso.data_rimborso.day,
            reso.data_rimborso.hour,
            reso.data_rimborso.minute,
            reso.data_rimborso.second,
            reso.data_rimborso.millisecond
          ),
          motivo : reso.motivo,
          prezzo_unitario : reso.prezzo_unitario,
          quantita : reso.quantita,
          importo : reso.importo,
          valuta : reso.valuta,
          stato_reso : reso.stato_reso
        };
    }
}
