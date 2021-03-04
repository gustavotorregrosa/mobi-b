import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassageirosController } from './passageiros.controller';
import { PassageirosService } from './passageiros.service';
import { PassageiroSchema } from './interfaces/passageiro.schema'

@Module({
  imports: [MongooseModule.forFeature([{name: 'Passageiro', schema: PassageiroSchema}])],
  controllers: [PassageirosController],
  providers: [PassageirosService]
})
export class PassageirosModule {}
