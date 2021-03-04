import React, { useContext, useEffect } from 'react'
import NavBar from '../components/index/navbar'
import { connect } from 'react-redux'
import UserContext from '../contexts/UserContext'
import PassageiroAdminPage from './admin.passageiro'

const AdminIndexPage = props => {

    const user = useContext(UserContext)
    
    return (<div>
        <NavBar />
        <h3>admin index</h3>
    </div>)
}

const mapStateToProps = state => {
    return {
        usuario: state.autenticacao.usuario
    }
}

export default connect(mapStateToProps)(AdminIndexPage)