import * as actionTypes from '../actions/actionTypes'

const initialState = {
    usuario: null
}

const atualizaLogin = (state, action) => {
   return {
       ...state,
       usuario: {...action.data}
   }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ATUALIZA_USUARIO:
            return atualizaLogin(state, action)
        default:
            return state
    }
}

export default reducer