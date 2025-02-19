export interface ProdottiFull{
    id : number;
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
    taglia_Eu: string[]; 
    taglia_Uk: string[]; 
    taglia_Us: string[]; 
    quantita: string[]; 
    url: string[]; 
    nome_colore : string[];
}