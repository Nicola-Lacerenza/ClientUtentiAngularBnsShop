export interface IArticoli {
    codart: string;
    descrizione: string;
    um: string;
    pzcart: number;
    peso: number;
    prezzo: number;
    active: boolean;
    data: Date;
    imageUrl: string; // Immagine principale
    imageUrls: string[]; // Array di immagini in miniatura
}
