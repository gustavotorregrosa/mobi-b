import { Body, Controller, Get, Post } from '@nestjs/common'
import { ICriaUsuario } from './dto/cria-usuario.dto'
import { IVerificaUsuario } from './dto/verifica-usuario.dto'
import { Usuario } from './interfaces/usuario.interface'
import { UsuarioJWT } from './interfaces/usuarioJWT.interface'
import { UsuariosService } from './usuarios.service'


@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly usuariosService: UsuariosService){}

    @Get()
    async listarUsuarios(): Promise<Array<Usuario>>{
        return await this.usuariosService.listaUsuarios()
    }

    @Post('/salvar')
    async salvarUsuario(@Body() usuario: ICriaUsuario): Promise<UsuarioJWT>{
        return await this.usuariosService.addUsuario(usuario)
    }
    
    @Post()
    async autenticarUsuario(@Body() usuario: IVerificaUsuario): Promise<UsuarioJWT | void>{
        console.log("ponto 1")
        console.log(usuario)
        return await this.usuariosService.autenticaUsuario(usuario)
    }


}
