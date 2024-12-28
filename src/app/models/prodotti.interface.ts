import { Immagini_has_Prodotti } from "./immagini_has_prodotti.interface";
import { Modello } from "./modello.interface";

export interface Prodotti{
    id : number;
    prezzo : number;
    stato_pubblicazione : number;
    nome_modello: string; 
    descrizione_modello: string; 
    nome_categoria: string; 
    nome_brand: string; 
    descrizione_brand: string; 
    url: string; 
}