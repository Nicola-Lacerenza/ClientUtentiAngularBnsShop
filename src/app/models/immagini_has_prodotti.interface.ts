import { Immagini } from "./immagini.interface";

export interface Immagini_has_Prodotti {
    id : number;
    id_immagine : number;
    id_prodotto : number;
    immagine: Immagini; 

}
