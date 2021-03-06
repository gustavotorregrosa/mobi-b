import React, { useEffect } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router'
import PageLogin from './pages/login'
import IndexPage from './pages/index'
import MotoristaPage from './pages/motorista'
// import PassageiroPage from './pages/passageiro'
import AdminPage from './pages/admin'
import UserService from './services/user'
import UserContext from './contexts/UserContext'
import HttpContext from './contexts/HttpContext'
import PassageiroContext from './contexts/PassageiroContext'
import MotoristaContext from './contexts/MotoristaContext'
import PassageiroService from './services/passageiros'
import MotoristaService from './services/motoristas'
import HttpService from './services/http'

function App(props) {
  const userService = new UserService(props)
  const passageiroService = new PassageiroService(props)
  const motoristaService = new MotoristaService(props)
  const httpService = new HttpService(props)
  httpService.setUser(userService)
  passageiroService.setHttp(httpService)
  motoristaService.setHttp(httpService)

  useEffect(() => {
    if (!userService.getUsuario().email) {
      props.history.push('/login')
    }
  }, [])

  return (<div>
    <HttpContext.Provider value={httpService}>
      <UserContext.Provider value={userService}>
        <MotoristaContext.Provider value={motoristaService}>
          <PassageiroContext.Provider value={passageiroService}>
            <Switch>
              <Route path="/login" component={PageLogin} />
              <Route path="/admin/*" component={AdminPage} />
              {/* <Route path="/passageiro" component={PassageiroPage} /> */}
              {/* <Route path="/motorista/*" component={MotoristaPage} /> */}
              <Route path="/*" component={IndexPage} />
            </Switch>
          </PassageiroContext.Provider>
        </MotoristaContext.Provider>
      </UserContext.Provider>
    </HttpContext.Provider>
  </div>)
}

export default withRouter(App)
