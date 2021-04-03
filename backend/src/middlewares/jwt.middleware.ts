import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { AutenticacaoService } from "src/autenticacao/autenticacao.service";
import { sign, verify } from 'jsonwebtoken'



@Injectable()
export class JwtMiddleware implements NestMiddleware {

    use(req: any, res: Response, next: Function) {

        let jwt = req.headers.jwt

        let userData: any = false
        try {
            userData = verify(jwt, 'gustavo') as {
                id: string,
                nome: string,
                email: string,
                iat: number
            }
        } catch (e) {
            console.log(e)
        }

        if (!userData) {
            throw new HttpException('Token inválido.', HttpStatus.UNAUTHORIZED)
        }

        let nowUnix = new Date().getTime() / 1000
        if (nowUnix > userData.iat + 1 * 60) {
            throw new HttpException('Token expirado.', HttpStatus.FORBIDDEN)

        }

        next()
    }

}