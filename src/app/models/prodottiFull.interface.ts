import { Taglia } from "./taglia.interface";
import { Taglie_Has_Prodotti } from "./taglie_has_prodotti.interface";

export interface ProdottiFull{
    id : number;
    id_modello : number;
    nome_modello: string; 
    descrizione_modello: string; 
    id_categoria : number;
    nome_categoria: string; 
    target: string; 
    id_brand : number;
    nome_brand: string; 
    descrizione_brand: string; 
    stato_pubblicazione : number;
    prezzo : number;
    taglieProdotto : {
        taglia : Taglia
        taglia_prodotti : Taglie_Has_Prodotti
    }[];
    url: string[]; 
    nome_colore : string[];
}