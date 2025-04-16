
export interface Ordine{
    id : number;
    id_ordine_paypal : string;
    id_pagamento : number;
    id_indirizzo : number;
    stato_ordine : string;
    data_ordine : Date;
    data_creazione_ordine : Date;
    data_aggiornamento_stato_ordine : Date;
    importo : number;
    valuta : string;
    locale_utente : string;
}