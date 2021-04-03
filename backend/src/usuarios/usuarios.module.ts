import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutenticacaoModule } from 'src/autenticacao/autenticacao.module';
import { JwtMiddleware } from 'src/middlewares/jwt.middleware';
import { UsuarioSchema } from './interfaces/usuario.schema';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Usuario', schema: UsuarioSchema}]), AutenticacaoModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule { //implements NestModule{
  // configure(consumer: MiddlewareConsumer) {
    // consumer.apply(JwtMiddleware).forRoutes({path: 'usuarios', method: RequestMethod.ALL})
  //}

}
