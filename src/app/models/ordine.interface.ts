import { Data } from "@angular/router";

export interface Ordine{
    id : number;
    id_customers : number;
    id_pagamento : number;
    id_indirizzo : number;
    stato_ordine : string;
    data_ordine : Data;
}