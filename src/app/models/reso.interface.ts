import { Ordine } from "./ordine.interface";

export interface Reso {
    id : number;
    ordine : Ordine;
    id_prodotto : number;
    numero_taglia : string; 
    data_richiesta : Date;
    motivo : string;
    prezzo_unitario : number;
    quantita : number;
    importo : number;
    valuta : string;
    stato_reso : string;
    data_rimborso : Date;
}
