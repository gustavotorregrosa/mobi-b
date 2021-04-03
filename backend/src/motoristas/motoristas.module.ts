import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MotoristaSchema } from './interfaces/motorista.schema';
import { MotoristasController } from './motoristas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MotoristasService } from './motoristas.service';
import { JwtMiddleware } from 'src/middlewares/jwt.middleware';
import { AutenticacaoModule } from 'src/autenticacao/autenticacao.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Motorista', schema: MotoristaSchema}]), AutenticacaoModule],
  controllers: [MotoristasController],
  providers: [MotoristasService]
})

export class MotoristasModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({path: 'motoristas', method: RequestMethod.ALL})
  }
  
}
