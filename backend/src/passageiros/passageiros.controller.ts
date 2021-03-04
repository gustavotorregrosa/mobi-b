import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IAtualizaPassageiro } from './dto/atualiza-passageiro.dto';
import { ICriaPassageiro } from './dto/cria-passageiro.dto';
import { PassageirosService } from './passageiros.service';

@Controller('passageiros')
export class PassageirosController {

    constructor(private readonly passageiroService: PassageirosService){}

    @Get()
    async listaPassageiros(){
        return await this.passageiroService.listaPassageiros()
    }


    @Post()
    async criarPassageiro(@Body() passageiro: ICriaPassageiro){
        return await this.passageiroService.addPassageiro(passageiro)
    }

    @Put(':_id')
    async atualizarPassageiro(@Body() passageiro: IAtualizaPassageiro, @Param('_id') id: string){
        return await this.passageiroService.atualizaPassageiro(id, passageiro)
    }

    @Delete(':_id')
    async deletaPassageiro(@Param('_id') id: string){
        return await this.passageiroService.deletaPassageiro(id)
    }

}
