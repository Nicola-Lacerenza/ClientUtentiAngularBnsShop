import { Brand } from './brand.interface';
import { Categoria } from './categoria.interface';
import { Codice_Sconto_Ricevuto_Server } from './codice_sconto_ricevuto_server.interface';
import { Indirizzo } from './indirizzo.interface';
import { Modello } from './modello.interface';
import { Ordine } from './ordine.interface';
import { ProdottiFull } from './prodottiFull.interface';
import { Taglia } from './taglia.interface';
import { UserRegister } from './UserRegister.interface';

export interface ServerResponse{
    message : string | UserRegister | Brand | Brand[] | Modello | Modello[] | Categoria | Categoria[] | ProdottiFull | ProdottiFull[] | Indirizzo | Indirizzo[] | Codice_Sconto_Ricevuto_Server | Codice_Sconto_Ricevuto_Server[] | Taglia | Taglia[] | Ordine[] | Ordine;
    check:boolean;
}
