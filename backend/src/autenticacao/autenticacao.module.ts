import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';

@Module({
  providers: [AutenticacaoService],
  exports: [AutenticacaoService]
})
export class AutenticacaoModule {}
