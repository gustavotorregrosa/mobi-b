import { Body, Controller, Get, Post } from '@nestjs/common'
import { ICriaUsuario } from './dto/cria-usuario.dto'
import { UsuariosService } from './usuarios.service'

interface Usuario {
    nome: string
    email: string
    // senha: string
    endereco: string
}


@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly usuariosService: UsuariosService){}

    @Get('/listar')
    async listarUsuarios(): Promise<Array<Usuario>>{
        return await this.usuariosService.listaUsuarios()
    }

    @Post('/salvar')
    async salvarUsuario(@Body() usuario: ICriaUsuario): Promise<Usuario>{
        console.log(usuario)
        return await this.usuariosService.addUsuario(usuario)
    }
    


}
