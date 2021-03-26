import { Injectable } from '@nestjs/common';

@Injectable()
export class AutenticacaoService {

    gerarTokens = ({ id, nome, email }) => {
        return {
            jwt: '123456789',
            refreshToken: 'abcdefg'
        }
    }
}
