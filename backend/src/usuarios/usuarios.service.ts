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

const HASH_ROUNDS = 10

@Injectable()
export class UsuariosService {

    constructor(@InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>, private readonly autenticacaoService: AutenticacaoService){}
    
    listaUsuarios = async (): Promise<Array<Usuario>> => {
        return await this.usuarioModel.find().exec()
    }


    autenticaUsuario = async ({email, senha}: IVerificaUsuario):Promise<UsuarioJWT | void> => {
        let usuario = await this.usuarioModel.findOne({email}).select('+senha').exec() as Usuario & {senha: string}
        let comparacao = await compare(senha, usuario.senha)
        if(!comparacao){
            return
        }

        const {id, nome, endereco } = usuario

        const usuarioJWT: UsuarioJWT = {
            id,
            nome, 
            email,
            endereco,
            refreshToken: 'temp...',
            refreshTokenValidity: new Date(),
            ...this.autenticacaoService.gerarTokens(usuario)
        }

        return usuarioJWT

    }

    addUsuario = async (usuarioDTO: ICriaUsuario): Promise<UsuarioJWT> => {
        const salt = await genSalt(HASH_ROUNDS)
        usuarioDTO.senha = await hash(usuarioDTO.senha, salt)

        const usuarioCriado = new this.usuarioModel({...usuarioDTO, refreshToken: this.autenticacaoService.createHash(), refreshTokenValidity: new Date()}) as Usuario & {senha:string}
        
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
    

}
