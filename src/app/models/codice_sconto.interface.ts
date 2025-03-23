export interface Codice_Sconto {
    id : number;
    codice : string;
    valore : number;
    descrizione : string;
    tipo : string;
    data_inizio : Date;
    data_fine : Date;
    uso_massimo : number;
    uso_per_utente : number;
    minimo_acquisto : number;
    attivo : number;
}
