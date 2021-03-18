import { Usuario } from "./usuario.interface";

export interface UsuarioJWT 
{
    readonly id: string;
    nome: string;
    email: string;
    endereco: string;
    jwt: string,
    refreshToken: string

}