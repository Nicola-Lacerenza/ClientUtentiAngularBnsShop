import { UserRegister } from './UserRegister.interface';

export interface ServerResponse{
    message : string | UserRegister;
    check:boolean;
}