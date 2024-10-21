import { Brand } from './brand.interface';
import { UserRegister } from './UserRegister.interface';

export interface ServerResponse{
    message : string | UserRegister | Brand | Brand[];
    check:boolean;
}