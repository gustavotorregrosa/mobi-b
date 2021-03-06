import { Module } from '@nestjs/common';
import { MotoristaSchema } from './interfaces/motorista.schema';
import { MotoristasController } from './motoristas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MotoristasService } from './motoristas.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Motorista', schema: MotoristaSchema}])],
  controllers: [MotoristasController],
  providers: [MotoristasService]
})
export class MotoristasModule {}
