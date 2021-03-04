import React, { useContext, useEffect } from 'react'
import NavBar from '../components/login/navbar'
import { connect } from 'react-redux'
import UserContext from '../contexts/UserContext'

const LoginPage = props => {

    return (<div>
        <NavBar />
    </div>)
}

const mapStateToProps = state => {
    return {
        usuario: state.autenticacao.usuario
    }
}

export default connect(mapStateToProps)(LoginPage)