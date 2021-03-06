import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IAtualizaMotorista } from './dto/atualiza-motorista.dto';
import { ICriaMotorista } from './dto/cria-motorista.dto';
import { MotoristasService } from './motoristas.service';

@Controller('motoristas')
export class MotoristasController {

    constructor(private readonly motoristasService: MotoristasService){}

    @Get()
    async listaMotoristas(){
        return await this.motoristasService.listaMotoristas()
    }


    @Post()
    async criarMotorista(@Body() motorista: ICriaMotorista){
        return await this.motoristasService.addMotorista(motorista)
    }

    @Put(':_id')
    async atualizarMotorista(@Body() motorista: IAtualizaMotorista, @Param('_id') id: string){
        return await this.motoristasService.atualizaMotorista(id, motorista)
    }

    @Delete(':_id')
    async deletaMotorista(@Param('_id') id: string){
        return await this.motoristasService.deletaMotorista(id)
    }

}
