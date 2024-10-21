import { Brand } from "./brand.interface";
import { UserLogin } from "./UserLogin.interface";
import { UserRegister } from "./UserRegister.interface";

export interface ServerRequest{
    body : UserLogin | UserRegister | Brand;
}