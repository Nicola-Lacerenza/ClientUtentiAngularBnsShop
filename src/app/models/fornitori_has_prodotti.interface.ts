import { Data } from "@angular/router";

export interface Fornitori_Has_Prodotti {
    id_prodotti : number;
    id_fornitore : number;
    data : Data;
    importo : number;
    descrizione : string;
}
