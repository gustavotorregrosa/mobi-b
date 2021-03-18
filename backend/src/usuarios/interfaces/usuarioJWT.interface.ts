import { Usuario } from "./usuario.interface";

export interface UsuarioJWT extends Usuario{
    jwt: string,
    refreshToken: string

}