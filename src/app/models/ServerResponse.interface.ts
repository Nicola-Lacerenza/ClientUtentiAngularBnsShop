import { Brand } from './brand.interface';
import { Categoria } from './categoria.interface';
import { Codice_Sconto } from './codice_sconto.interface';
import { Indirizzo } from './indirizzo.interface';
import { Modello } from './modello.interface';
import { ProdottiFull } from './prodottiFull.interface';
import { UserRegister } from './UserRegister.interface';

export interface ServerResponse{
    message : string | UserRegister | Brand | Brand[] | Modello | Modello[] | Categoria | Categoria[] | ProdottiFull | ProdottiFull[] | Indirizzo | Indirizzo[] | Codice_Sconto | Codice_Sconto[];
    check:boolean;
}