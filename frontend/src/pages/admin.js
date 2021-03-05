import React, { useContext, useEffect } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router'
import { connect } from 'react-redux'
import UserContext from '../contexts/UserContext'
import PassageiroAdminPage from './admin.passageiro'
import AdminIndexPage from './admin.index'

const AdminPage = props => {

    const user = useContext(UserContext)
    
    return (<div>
      <Switch>
        <Route path="/admin/passageiros" component={PassageiroAdminPage} />
        <Route path="/admin/motoristas" component={PassageiroAdminPage} />
        <Route path="/admin" component={AdminIndexPage} />
      </Switch>
    </div>)
}

const mapStateToProps = state => {
    return {
        usuario: state.autenticacao.usuario
    }
}

export default connect(mapStateToProps)(AdminPage)