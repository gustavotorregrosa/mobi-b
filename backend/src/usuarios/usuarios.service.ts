import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICriaUsuario } from './dto/cria-usuario.dto';
import { IAtualizaUsuario } from './dto/atualiza-usuario.dto'
import { Usuario } from './interfaces/usuario.interface';
import { genSalt, hash, compare } from 'bcryptjs';
import { UsuarioJWT } from './interfaces/usuarioJWT.interface';
import { IVerificaUsuario } from './dto/verifica-usuario.dto';
import { AutenticacaoService } from 'src/autenticacao/autenticacao.service';

const HASH_ROUNDS = 10

@Injectable()
export class UsuariosService {

    constructor(@InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>, private readonly autenticacaoService: AutenticacaoService){}
    
    listaUsuarios = async (): Promise<Array<Usuario>> => {
        return await this.usuarioModel.find().exec()
    }


    autenticaUsuario = async ({email, senha}: IVerificaUsuario):Promise<UsuarioJWT | void> => {
        console.log("ponto 2")
        console.log(email)
        console.log(senha)
        
        let usuario = await this.usuarioModel.findOne({email}).select('+senha').exec() as Usuario
        console.log(usuario)
        // let senhaBanco = await this.usuarioModel.findOne({email}).populate('senha').exec()
        
        // as Usuario & {senha: string} 
        console.log("ponto 3")
        // console.log(senhaBanco)
        
        // let comparacao = await compare(senha, senhaBanco)
        console.log("ponto 4")
        // console.log(comparacao)
        // if(!comparacao){
        //     return
        // }

        const {id, nome, endereco } = usuario

        const usuarioJWT: UsuarioJWT = {
            id,
            nome, 
            email,
            endereco,
            jwt: 'teste jwt',
            refreshToken: 'abc'
        }

        return usuarioJWT

    }

    addUsuario = async (usuarioDTO: ICriaUsuario): Promise<UsuarioJWT> => {
        console.log(usuarioDTO)
        const salt = await genSalt(HASH_ROUNDS)
        usuarioDTO.senha = await hash(usuarioDTO.senha, salt)
        const usuarioCriado = new this.usuarioModel(usuarioDTO) as Usuario & {senha:string}
        await usuarioCriado.save()

        let usuarioSafe: any = {
            ...usuarioCriado.toJSON()
        }
        delete usuarioSafe.senha

        const {jwt, refreshToken} = this.autenticacaoService.gerarTokens()

        usuarioSafe = {
            ...usuarioSafe,
            jwt,
            refreshToken
        } as UsuarioJWT

        return usuarioSafe

    }
    

}
