import React, {Component} from 'react';
import * as actions from '../redux/actions/index'
import { connect } from 'react-redux'
import store from '../redux/store'


class UserService extends Component {

    alteraUsuario = usuario => {
        store.dispatch(actions.atualizaUsuario(usuario))
        localStorage.setItem('usuario', JSON.stringify(usuario))
    }

    logout = () => {
        store.dispatch(actions.atualizaUsuario({}))
        localStorage.removeItem('usuario')
    }

    runFirstCheck = () => {
        let usuario = JSON.parse(localStorage.getItem('usuario'))
        if(usuario){
            this.login(usuario)
        }
    }

    login = usuario => {
        this.alteraUsuario(usuario)
        // this.props.history.push(usuario.perfil)
        this.props.history.push('/admin')
    }

    getUsuario = () => store.getState().autenticacao.usuario ?? {}

    getRefreshToken = () => this.getUsuario().refreshToken

    getEmail = () => this.getUsuario().email

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