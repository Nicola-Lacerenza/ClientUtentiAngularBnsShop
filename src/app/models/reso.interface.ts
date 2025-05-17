import { ProdottiFull } from "./prodottiFull.interface";

export interface Reso {
    id : number;
    id_ordine : number;
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
