import { Body, Controller, Get, Post, Headers } from '@nestjs/common'
import { ICriaUsuario } from './dto/cria-usuario.dto'
import { IVerificaUsuario } from './dto/verifica-usuario.dto'
import { Usuario } from './interfaces/usuario.interface'
import { UsuarioJWT } from './interfaces/usuarioJWT.interface'
import { UsuariosService } from './usuarios.service'
import { AutenticacaoService} from '../autenticacao/autenticacao.service'
import {IRefreshUsuario} from './dto/refresh-usuario.dto'

@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly usuariosService: UsuariosService, private readonly autenticacaoService: AutenticacaoService){}

    @Get()
    async listarUsuarios(): Promise<Array<Usuario>>{
        return await this.usuariosService.listaUsuarios()
    }

    @Post('/refresh')
    async refresh(@Body() usuario: IRefreshUsuario): Promise<UsuarioJWT | void>{
        return await this.usuariosService.refreshUsuario(usuario)
    }


    @Post('/salvar')
    async salvarUsuario(@Body() usuario: ICriaUsuario): Promise<UsuarioJWT>{
        return await this.usuariosService.addUsuario(usuario)
    }
    
    @Post()
    async autenticarUsuario(@Body() usuario: IVerificaUsuario): Promise<UsuarioJWT | void>{
        return await this.usuariosService.autenticaUsuario(usuario)
    }




}
