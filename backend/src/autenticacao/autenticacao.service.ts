import { Injectable } from '@nestjs/common';

@Injectable()
export class AutenticacaoService {

    gerarTokens = () => {
        return {
            jwt: '123456789',
            refreshToken: 'abcdefg'
        }
    }
}
