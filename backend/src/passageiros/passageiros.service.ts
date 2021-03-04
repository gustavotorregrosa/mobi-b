import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAtualizaPassageiro } from './dto/atualiza-passageiro.dto';
import { ICriaPassageiro } from './dto/cria-passageiro.dto';
import { Passageiro } from './interfaces/passageiro.interface';

@Injectable()
export class PassageirosService {

    constructor(@InjectModel('Passageiro') private readonly passageiroModel: Model<Passageiro>){}

    listaPassageiros = async (): Promise<Array<Passageiro>> => {
        return await this.passageiroModel.find().exec()
    }

    deletaPassageiro = async (_id): Promise<Passageiro> => {

        const passageiro = await this.passageiroModel.findOne({_id}).exec()
        if(!passageiro){
            throw new NotFoundException(`Passageiro com id ${_id} não encontrado`)
        }

        await this.passageiroModel.deleteOne({_id}).exec();

        return passageiro


    }

    addPassageiro = async (passageiroDTO: ICriaPassageiro): Promise<Passageiro> => {
        const passageiroCriado = new this.passageiroModel(passageiroDTO)
        return await passageiroCriado.save()
    }

    atualizaPassageiro = async (_id, passageiroDTO: IAtualizaPassageiro) => {

        const passageiroEncontrado = await this.passageiroModel.findOne({_id}).exec()

        if (!passageiroEncontrado) {
            throw new NotFoundException(`Passageiro com id ${_id} não econtrado`)
        }

        return await this.passageiroModel.findOneAndUpdate({_id}, 
            {$set: passageiroDTO}).exec()

    }

    

}
