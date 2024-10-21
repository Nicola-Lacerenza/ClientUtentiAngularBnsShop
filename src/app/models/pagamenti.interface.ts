import { Data } from "@angular/router";

export interface Pagamenti{
    id : number;
    nome_titolare : string;
    numero_carta : number;
    data_scadenza : Data;
    codice_verifica : string;
    id_customers : number;
}