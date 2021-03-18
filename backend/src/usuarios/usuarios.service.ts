import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICriaUsuario } from './dto/cria-usuario.dto';
import { IAtualizaUsuario } from './dto/atualiza-usuario.dto'
import { Usuario } from './interfaces/usuario.interface';
import { genSalt, hash, compare } from 'bcryptjs';
import { UsuarioJWT } from './interfaces/usuarioJWT.interface';
import { IVerificaUsuario } from './dto/verifica-usuario.dto';

const HASH_ROUNDS = 10

@Injectable()
export class UsuariosService {

    constructor(@InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>){}
    
    listaUsuarios = async (): Promise<Array<Usuario>> => {
        // return await usuarios
        // select('+senha')
        return await this.usuarioModel.find().exec()
    }


    autenticaUsuario = async ({email, senha}: IVerificaUsuario):Promise<UsuarioJWT | void> => {
        const usuario = await this.usuarioModel.findOne({email}).populate('+senha').exec() as Usuario & {senha: string} 
        let comparacao = await compare(senha, usuario.senha)
        if(!comparacao){
            return
        }
        
    }

    // getUsuario = async ({email, senha}: IAtualizaUsuario): Promise<Usuario> => {
    //     return await this.usuarioModel.findOne({ email }).exec()
    // }

    // deletaUsuario = async (_id): Promise<Usuario> => {

    //     const usuario = await this.usuarioModel.findOne({_id}).exec()Usuario
    //     if(!usuario){
    //         throw new NotFoundException(`Usuario com id ${_id} não encontrado`)
    //     }

    //     await this.usuarioModel.deleteOne({_id}).exec();

    //     return usuario


    // }

    addUsuario = async (usuarioDTO: ICriaUsuario): Promise<Usuario> => {
        console.log(usuarioDTO)
        const salt = await genSalt(HASH_ROUNDS)
        usuarioDTO.senha = await hash(usuarioDTO.senha, salt)
        // usuarios.push({...usuarioDTO})
        // return await usuarioDTO as Usuario
        const usuarioCriado = new this.usuarioModel(usuarioDTO)
        return await usuarioCriado.save()
    }

    // atualizaUsuario = async (_id, usuarioDTO: IAtualizaUsuario) => {

    //     const usuarioEncontrado = await this.usuarioModel.findOne({_id}).exec()

    //     if (!usuarioEncontrado) {
    //         throw new NotFoundException(`Usuario com id ${_id} não econtrado`)
    //     }

    //     return await this.usuarioModel.findOneAndUpdate({_id}, 
    //         {$set: usuarioDTO}).exec()

    // }

    

}
