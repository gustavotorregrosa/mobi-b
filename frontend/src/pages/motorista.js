import React, { useContext, useEffect } from 'react'
import NavBar from '../components/index/navbar'
import { connect } from 'react-redux'
import UserContext from '../contexts/UserContext'

const MotoristaPage = props => {

    const user = useContext(UserContext)
    
    return (<div>
        <NavBar />
        <h3>motorista...</h3>
    </div>)
}

const mapStateToProps = state => {
    return {
        usuario: state.autenticacao.usuario
    }
}

export default connect(mapStateToProps)(MotoristaPage)