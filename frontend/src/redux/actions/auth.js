import * as actionTypes from './actionTypes'

export const atualizaUsuario = usuario => {
    return {
        type: actionTypes.ATUALIZA_USUARIO,
        data: usuario
    }
}