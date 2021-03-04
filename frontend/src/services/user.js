import React, {Component} from 'react';
import * as actions from '../redux/actions/index'
import { connect } from 'react-redux'
import store from '../redux/store'


class UserService extends Component {

    // constructor(props){
    //     super(props)
    // }

    alteraUsuario = usuario => {
        store.dispatch(actions.atualizaUsuario(usuario))
        // localStorage.setItem('usuario', JSON.parse(usuario))
    }

    logout = () => {
        store.dispatch(actions.atualizaUsuario({}))
        localStorage.removeItem('usuario')
    }

    login = usuario => {

        let _usuario = {
            nome: 'gustavo',
            email: 'gustavo.torregrosa@gmail.com',
            perfil: 'admin'
        }

        this.alteraUsuario(_usuario)
        this.props.history.push(_usuario.perfil)
    }


    getUsuario = () => store.getState().autenticacao.usuario ?? {}

    getRefreshToken = () => this.getUsuario().refreshToken

    getJwt = () => this.getUsuario().jwt

    setJwt = jwt => {
        let usuario = {
            ...this.getUsuario(),
            jwt
        } 

        this.alteraUsuario(usuario)
    }

}

export default UserService