import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { map, Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse.interface';
import { environment } from '../../environments/environment';
import { ServerRequest } from '../models/ServerRequest.interface';
import { Codice_Sconto_Ricevuto_Server } from '../models/codice_sconto_ricevuto_server.interface';
import { Codice_Sconto } from '../models/codice_sconto.interface';

@Injectable({
  providedIn: 'root'
})
export class CodiceScontoService {

  constructor(private httprequest:HttpRequestService) { }


  public getCodiceSconto(id:number):Observable<Codice_Sconto>{
    return this.httprequest.getRequest(environment.serverUrl + "/CodiceScontoServlet?id="+id).pipe(
      map((data:ServerResponse) => {
        const tmp:Codice_Sconto_Ricevuto_Server = <Codice_Sconto_Ricevuto_Server>data.message;
        return this.convertServerResponseToCodiceSconto(tmp);
      })
    );
  }

  public getCodiceSconti(): Observable<Codice_Sconto[]>{
    return this.httprequest.getRequest(environment.serverUrl + "/CodiceScontoServlet").pipe(
      map((data:ServerResponse) => {
        const tmp:Codice_Sconto_Ricevuto_Server[] = <Codice_Sconto_Ricevuto_Server[]>data.message;
        const codiciSconto:Codice_Sconto[] = [];
        for(const tmp1 of tmp){
          const codice:Codice_Sconto = this.convertServerResponseToCodiceSconto(tmp1);
          codiciSconto.push(codice);
        }
        return codiciSconto;
      })
    );
  }

  public insertCodiceSconto(body:ServerRequest):Observable<ServerResponse>{
    return this.httprequest.postRequest(environment.serverUrl + "/CodiceScontoServlet",body)
  }

  public updateCodiceSconto(id: number, body: ServerRequest): Observable<ServerResponse> {
    return this.httprequest.putRequest(environment.serverUrl + "/CodiceScontoServlet?id=" + id, body);
  }

  public deleteCodiceSconto(id: number): Observable<ServerResponse> {
    return this.httprequest.deleteRequest(environment.serverUrl + "/CodiceScontoServlet?id=" + id);
  }

  private convertServerResponseToCodiceSconto(codice:Codice_Sconto_Ricevuto_Server):Codice_Sconto{
    return {
      id : codice.id,
      codice : codice.codice,
      valore : codice.valore,
      descrizione : codice.descrizione,
      tipo : codice.tipo,
      data_inizio : new Date(
        codice.data_inizio.year,
        codice.data_inizio.month - 1,
        codice.data_inizio.day,
        codice.data_inizio.hour,
        codice.data_inizio.minute,
        codice.data_inizio.second,
        codice.data_inizio.millisecond
      ),
      data_fine : new Date(
        codice.data_fine.year,
        codice.data_fine.month - 1,
        codice.data_fine.day,
        codice.data_fine.hour,
        codice.data_fine.minute,
        codice.data_fine.second,
        codice.data_fine.millisecond
      ),
      uso_massimo : codice.uso_massimo,
      uso_per_utente : codice.uso_per_utente,
      minimo_acquisto : codice.minimo_acquisto,
      attivo : codice.attivo
    };
  }
}
