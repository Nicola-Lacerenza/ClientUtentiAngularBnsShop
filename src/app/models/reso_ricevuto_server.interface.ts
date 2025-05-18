import { ProdottiFull } from "./prodottiFull.interface";

export interface Reso_Ricevuto_Server {
    id : number;
    id_ordine : number;
    id_prodotto : number;
    numero_taglia : string; 
    data_richiesta : {
        day: number;
        month: number;
        year: number;
        hour: number;
        minute: number;
        second: number;
        millisecond: number
    };
    motivo : string;
    prezzo_unitario : number;
    quantita : number;
    importo : number;
    valuta : string;
    stato_reso : string;
    data_rimborso : {
        day: number;
        month: number;
        year: number;
        hour: number;
        minute: number;
        second: number;
        millisecond: number
    };
}
