import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAtualizaUsuario } from './dto/atualiza-usuario.dto';
import { ICriaUsuario } from './dto/cria-usuario.dto';
import { IVerificaUsuario } from './dto/atualiza-usuario.dto'
import { Usuario } from './interfaces/usuario.interface';
import bcrypt from 'bcryptjs';

const HASH_ROUNDS = 10

@Injectable()
export class UsuariosService {

    constructor(@InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>){}
    
    
    listaUsuarios = async (): Promise<Array<Usuario>> => {
        return await this.usuarioModel.find().exec()
    }

    getUsuario = async ({email, senha}: IVerificaUsuario): Promise<Usuario> => {
        return await this.usuarioModel.findOne({ email }).exec()
    }

    // deletaUsuario = async (_id): Promise<Usuario> => {

    //     const usuario = await this.usuarioModel.findOne({_id}).exec()
    //     if(!usuario){
    //         throw new NotFoundException(`Usuario com id ${_id} não encontrado`)
    //     }

    //     await this.usuarioModel.deleteOne({_id}).exec();

    //     return usuario


    // }

    addUsuario = async (usuarioDTO: ICriaUsuario): Promise<Usuario> => {
        const salt = await bcrypt.genSalt(HASH_ROUNDS)
        usuarioDTO.senha = await bcrypt.hash(usuarioDTO.senha, salt)
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
