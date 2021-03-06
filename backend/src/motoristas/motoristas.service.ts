import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAtualizaMotorista } from './dto/atualiza-motorista.dto';
import { ICriaMotorista } from './dto/cria-motorista.dto';
import { Motorista } from './interfaces/motorista.interface';

@Injectable()
export class MotoristasService {

    constructor(@InjectModel('Motorista') private readonly motoristaModel: Model<Motorista>){}

    listaMotoristas = async (): Promise<Array<Motorista>> => {
        return await this.motoristaModel.find().exec()
    }

    deletaMotorista = async (_id): Promise<Motorista> => {

        const motorista = await this.motoristaModel.findOne({_id}).exec()
        if(!motorista){
            throw new NotFoundException(`Motorista com id ${_id} não encontrado`)
        }

        await this.motoristaModel.deleteOne({_id}).exec();

        return motorista


    }

    addMotorista = async (motoristaDTO: ICriaMotorista): Promise<Motorista> => {
        const motoristaCriado = new this.motoristaModel(motoristaDTO)
        return await motoristaCriado.save()
    }

    atualizaMotorista = async (_id, motoristaDTO: IAtualizaMotorista) => {

        const motoristaEncontrado = await this.motoristaModel.findOne({_id}).exec()

        if (!motoristaEncontrado) {
            throw new NotFoundException(`Motorista com id ${_id} não econtrado`)
        }

        return await this.motoristaModel.findOneAndUpdate({_id}, 
            {$set: motoristaDTO}).exec()

    }

    

}
