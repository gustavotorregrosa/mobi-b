import React, { useRef, useEffect } from 'react'
import LoginModal from './modalLogin'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import RegisterModal from './modalRegister'

const LoginNavbar = props => {

    let navBarMobile = useRef(null)
    let instance
    let openLoginModal = () => {}
    let openRegisterModal = () => {}

    useEffect(() => {
        instance = M.Sidenav.init(navBarMobile.current, {})
    }, [])

    const openLogin = e => {
        e.preventDefault()
        openLoginModal()
    }

    const openRegister= e => {
        e.preventDefault()
        openRegisterModal()
    }

    return (<div>
        <nav className="black">
            <div className="nav-wrapper container">
                <a href="#" className="brand-logo">Mobi-b</a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="#" onClick={e => openLogin(e)}>Login</a></li>
                    <li><a href="#" onClick={e => openRegister(e)}>Registro</a></li>
                </ul>
            </div>
        </nav>

        <ul ref={navBarMobile} className="sidenav" id="mobile-demo">
            <li><a onClick={e => openLogin(e)} href="#">Login</a></li>
            <li><a href="#" onClick={e => openRegister(e)}>Registro</a></li>
        </ul>

        <LoginModal setOpenModal={f => openLoginModal = f}  />
        <RegisterModal setOpenModal={f => openRegisterModal = f} />


    </div>)
}

export default LoginNavbar