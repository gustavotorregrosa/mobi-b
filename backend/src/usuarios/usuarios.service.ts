import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { ICriaUsuario } from './dto/cria-usuario.dto';
import { IAtualizaUsuario } from './dto/atualiza-usuario.dto'
import { Usuario } from './interfaces/usuario.interface';
import { genSalt, hash, compare } from 'bcryptjs';
import { UsuarioJWT } from './interfaces/usuarioJWT.interface';
import { IVerificaUsuario } from './dto/verifica-usuario.dto';
import { AutenticacaoService } from 'src/autenticacao/autenticacao.service';
import { UsuarioComChaves } from './interfaces/usuario-com-chaves.interface';
import { IRefreshUsuario } from './dto/refresh-usuario.dto';

const HASH_ROUNDS = 10

@Injectable()
export class UsuariosService {

    constructor(@InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>, private readonly autenticacaoService: AutenticacaoService){}
    
    listaUsuarios = async (): Promise<Array<Usuario>> => {
        return await this.usuarioModel.find().exec()
    }

    private _autentica = async (usuario: any): Promise<UsuarioJWT> => {
        usuario.refreshToken = this.autenticacaoService.createHash()

        let refreshTokenValidity = new Date()
        refreshTokenValidity.setHours(refreshTokenValidity.getHours() + 2)
        usuario.refreshTokenValidity = refreshTokenValidity

        usuario.save()

        const {id, nome, email, endereco, refreshToken } = usuario

        const usuarioJWT: UsuarioJWT = {
            id,
            nome, 
            email,
            endereco,
            refreshToken,
            refreshTokenValidity,
            ...this.autenticacaoService.gerarTokens(usuario)
        }

        return usuarioJWT
    }


    autenticaUsuario = async ({email, senha}: IVerificaUsuario):Promise<UsuarioJWT | void> => {
        let usuario = await this.usuarioModel.findOne({email}).select('+senha').select('+refreshTokenValidity').select('+refreshToken').exec() as UsuarioComChaves & {senha: string }
        if(!usuario){
            return
        }
        
        let comparacao = await compare(senha, usuario.senha)
        if(!comparacao){
            return
        }

        return await this._autentica(usuario)

        usuario.refreshToken = this.autenticacaoService.createHash()

        let refreshTokenValidity = new Date()
        refreshTokenValidity.setHours(refreshTokenValidity.getHours() + 2)
        usuario.refreshTokenValidity = refreshTokenValidity

        usuario.save()

        const {id, nome, endereco, refreshToken } = usuario

        const usuarioJWT: UsuarioJWT = {
            id,
            nome, 
            email,
            endereco,
            refreshToken,
            refreshTokenValidity,
            ...this.autenticacaoService.gerarTokens(usuario)
        }

        return usuarioJWT

    }

    addUsuario = async (usuarioDTO: ICriaUsuario): Promise<UsuarioJWT> => {
        const salt = await genSalt(HASH_ROUNDS)
        usuarioDTO.senha = await hash(usuarioDTO.senha, salt)

        let refreshTokenValidity = new Date()
        refreshTokenValidity.setHours(refreshTokenValidity.getHours() + 2)

        const usuarioCriado = new this.usuarioModel({...usuarioDTO, refreshToken: this.autenticacaoService.createHash(), refreshTokenValidity}) as Usuario & {senha:string}
        
        await usuarioCriado.save()

        let usuarioSafe: any = {
            ...usuarioCriado.toJSON()
        }
        delete usuarioSafe.senha

        const {jwt} = this.autenticacaoService.gerarTokens(usuarioCriado)

        usuarioSafe = {
            ...usuarioSafe,
            jwt
        } as UsuarioJWT

        return usuarioSafe

    }
    
    refreshUsuario = async ({email, refreshToken}: IRefreshUsuario): Promise<UsuarioJWT | void> => {
        let usuario = await this.usuarioModel.findOne({email, refreshToken}).select('+refreshTokenValidity').select('+refreshToken').exec() as UsuarioComChaves
        if(!usuario){
            return
        }

        return await this._autentica(usuario)

        
    }

}
