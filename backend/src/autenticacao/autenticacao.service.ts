import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken'
import { createHash } from 'crypto'

@Injectable()
export class AutenticacaoService {

    gerarTokens = ({ id, nome, email }) => {
        let jwt = sign({id, nome, email}, 'gustavo')
        return {
            jwt
        }
    }

    createHash = () => createHash('sha1').update(
        (new Date()).valueOf().toString() + Math.random().toString()
    ).digest('hex')

}
