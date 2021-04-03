import { MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassageirosController } from './passageiros.controller';
import { PassageirosService } from './passageiros.service';
import { PassageiroSchema } from './interfaces/passageiro.schema'
import { JwtMiddleware } from 'src/middlewares/jwt.middleware';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Passageiro', schema: PassageiroSchema}])],
  controllers: [PassageirosController],
  providers: [PassageirosService]
})


export class PassageirosModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({path: 'passageiros', method: RequestMethod.ALL})
  }

}
