import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutenticacaoModule } from 'src/autenticacao/autenticacao.module';
import { UsuarioSchema } from './interfaces/usuario.schema';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Usuario', schema: UsuarioSchema}]), AutenticacaoModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
