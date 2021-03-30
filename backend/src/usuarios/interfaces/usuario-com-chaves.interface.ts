import { Usuario } from "./usuario.interface";

export interface UsuarioComChaves extends Usuario {
    
    refreshToken: string,
    refreshTokenValidity: Date
    
}