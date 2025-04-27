export interface Codice_Sconto_Ricevuto_Server {
  id : number;
  codice : string;
  valore : number;
  descrizione : string;
  tipo : string;
  data_inizio : {
    day: number;
    month: number;
    year: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number
  };
  data_fine : {
    day: number;
    month: number;
    year: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number
  };
  uso_massimo : number;
  uso_per_utente : number;
  minimo_acquisto : number;
  attivo : number;
}
